package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.ERole;
import com.louaysaafi.HotelManagementSystem.models.Role;
import com.louaysaafi.HotelManagementSystem.models.User;
import com.louaysaafi.HotelManagementSystem.payload.request.SignupRequest;
import com.louaysaafi.HotelManagementSystem.payload.response.MessageResponse;
import com.louaysaafi.HotelManagementSystem.repositories.RoleRepository;
import com.louaysaafi.HotelManagementSystem.repositories.UserRepository;
import com.louaysaafi.HotelManagementSystem.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName());

        Role pendingRole = roleRepository.findByName(ERole.ROLE_PENDING)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        Set<Role> roles = new HashSet<>();
        roles.add(pendingRole);

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully! Please wait for admin verification."));
    }

    @GetMapping("/pending-users")
    public List<User> getPendingUsers() {
        Role pendingRole = roleRepository.findByName(ERole.ROLE_PENDING)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        return userRepository.findByRolesContains(pendingRole);
    }

    @PostMapping("/verify-user/{userId}")
    public ResponseEntity<?> verifyUser(@PathVariable Long userId, @RequestParam String roleName) throws MessagingException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        Role role = roleRepository.findByName(ERole.valueOf(roleName.toUpperCase()))
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        user.getRoles().clear();
        user.getRoles().add(role);
        userRepository.save(user);

        // Send email notification
        String subject = "Account Verified";
        String userName = user.getFirstName() + " " + user.getLastName();
        emailService.sendEmail(user.getEmail(), subject, userName);

        return ResponseEntity.ok(new MessageResponse("User verified and role assigned successfully!"));
    }
}
