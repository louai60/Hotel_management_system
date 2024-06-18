package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.payload.request.LoginRequest;
import com.louaysaafi.HotelManagementSystem.payload.response.MessageResponse;
import com.louaysaafi.HotelManagementSystem.payload.response.UserInfoResponse;
import com.louaysaafi.HotelManagementSystem.repositories.UserRepository;
import com.louaysaafi.HotelManagementSystem.security.jwt.JwtUtils;
import com.louaysaafi.HotelManagementSystem.security.services.UserDetailsImpl;
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

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    try {
      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

      // Check if user has ROLE_PENDING role
      if (userDetails.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_PENDING"))) {
        // If user has ROLE_PENDING, return unauthorized
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User account is pending verification."));
      }

      // Generate JWT cookie and construct user info response
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
              .body(userInfoResponse);
    } catch (AuthenticationException e) {
      // Handle authentication failure
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
}
