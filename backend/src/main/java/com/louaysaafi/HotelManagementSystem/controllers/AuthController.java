package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.PasswordResetToken;
import com.louaysaafi.HotelManagementSystem.models.User;
import com.louaysaafi.HotelManagementSystem.payload.request.LoginRequest;
import com.louaysaafi.HotelManagementSystem.payload.request.PasswordResetRequest;
import com.louaysaafi.HotelManagementSystem.payload.request.ResetPasswordRequest;
import com.louaysaafi.HotelManagementSystem.payload.response.MessageResponse;
import com.louaysaafi.HotelManagementSystem.payload.response.UserInfoResponse;
import com.louaysaafi.HotelManagementSystem.repositories.PasswordResetTokenRepository;
import com.louaysaafi.HotelManagementSystem.repositories.UserRepository;
import com.louaysaafi.HotelManagementSystem.security.jwt.JwtUtils;
import com.louaysaafi.HotelManagementSystem.security.services.UserDetailsImpl;
import com.louaysaafi.HotelManagementSystem.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private EmailService emailService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            if (userDetails.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_PENDING"))) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User account is pending verification."));
            }

            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            UserInfoResponse userInfoResponse = new UserInfoResponse(
                    userDetails.getId(),
                    userDetails.getFirstName(),
                    userDetails.getLastName(),
                    userDetails.getEmail(),
                    roles
            );

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwtCookie.getValue())
                    .body(userInfoResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Authentication failed"));
        }
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }

    @PostMapping("/request-reset-password")
    public ResponseEntity<?> requestResetPassword(@Valid @RequestBody PasswordResetRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String token = UUID.randomUUID().toString();
            PasswordResetToken passwordResetToken = new PasswordResetToken();
            passwordResetToken.setToken(token);
            passwordResetToken.setUserId(user.getId());
            passwordResetToken.setExpiryDate(new Date(System.currentTimeMillis() + 3600000)); // 1 hour expiration
            passwordResetTokenRepository.save(passwordResetToken);

            String resetUrl = "http://localhost:5173/reset-password?token=" + token;
            try {
                emailService.sendPasswordResetEmail(user.getEmail(), resetUrl);
            } catch (MessagingException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Failed to send email."));
            }

            return ResponseEntity.ok(new MessageResponse("Password reset email sent."));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Email not found."));
        }
    }

    @PostMapping("/reset-password")
    @Transactional
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        Optional<PasswordResetToken> tokenOptional = passwordResetTokenRepository.findByToken(request.getToken());

        if (tokenOptional.isPresent()) {
            PasswordResetToken passwordResetToken = tokenOptional.get();

            if (passwordResetToken.getExpiryDate().before(new Date())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Token has expired."));
            }

            Optional<User> userOptional = userRepository.findById(passwordResetToken.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setPassword(encoder.encode(request.getNewPassword()));
                userRepository.save(user);
                passwordResetTokenRepository.deleteByToken(request.getToken());
                return ResponseEntity.ok(new MessageResponse("Password reset successfully."));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found."));
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Invalid token."));
        }
    }
}
