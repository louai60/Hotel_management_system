package com.louaysaafi.HotelManagementSystem.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class PasswordResetRequest {
    @NotBlank
    @Email
    private String email;

    // getters and setters

    public @NotBlank @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Email String email) {
        this.email = email;
    }
}

