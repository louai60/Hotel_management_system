package com.louaysaafi.HotelManagementSystem.models;

public class EmployeeRolePercentage {
    private String role;
    private double percentage;

    // Constructors, getters, and setters
    public EmployeeRolePercentage(String role, double percentage) {
        this.role = role;
        this.percentage = percentage;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
}
