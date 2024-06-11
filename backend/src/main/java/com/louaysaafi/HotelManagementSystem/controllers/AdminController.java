package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.ERole;
import com.louaysaafi.HotelManagementSystem.models.Role;
import com.louaysaafi.HotelManagementSystem.models.User;
import com.louaysaafi.HotelManagementSystem.payload.request.SignupRequest;
import com.louaysaafi.HotelManagementSystem.payload.response.MessageResponse;
import com.louaysaafi.HotelManagementSystem.repository.RoleRepository;
import com.louaysaafi.HotelManagementSystem.repository.UserRepository;
import com.louaysaafi.HotelManagementSystem.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account with pending role
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

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
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> verifyUser(@PathVariable Long userId, @RequestParam String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        Role role = roleRepository.findByName(ERole.valueOf(roleName.toUpperCase()))
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        user.getRoles().clear();
        user.getRoles().add(role);
        userRepository.save(user);

        // Send email notification
        String subject = "Account Verified";
        String text = "Dear " + user.getUsername() + ",\n\nYour account has been verified and you now have access to the dashboard.\n\nBest regards,\nHotel Management System";
        emailService.sendEmail(user.getEmail(), subject, text);

        return ResponseEntity.ok(new MessageResponse("User verified and role assigned successfully!"));
    }
}
