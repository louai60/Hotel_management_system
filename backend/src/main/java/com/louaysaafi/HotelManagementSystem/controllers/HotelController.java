package com.louaysaafi.HotelManagementSystem.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hotel")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HotelController {

//    @Autowired
//    private UserRepository userRepository;

    @GetMapping("/rooms")
    @PreAuthorize("hasRole('ROLE_GUEST') or hasRole('ROLE_RECEPTIONIST') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    public String viewRooms() {
        return "List of available rooms.";
    }

    @PostMapping("/book")
    @PreAuthorize("hasRole('ROLE_GUEST')")
    public String bookRoom() {
        return "Room booked successfully.";
    }

    @PostMapping("/checkin")
    @PreAuthorize("hasRole('ROLE_RECEPTIONIST') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    public String checkIn() {
        return "Guest checked in successfully.";
    }

    @PostMapping("/checkout")
    @PreAuthorize("hasRole('ROLE_RECEPTIONIST') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    public String checkOut() {
        return "Guest checked out successfully.";
    }

    @GetMapping("/maintenance")
    @PreAuthorize("hasRole('ROLE_MAINTENANCE') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    public String viewMaintenanceTasks() {
        return "List of maintenance tasks.";
    }

    @PostMapping("/maintenance")
    @PreAuthorize("hasRole('ROLE_MAINTENANCE') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    public String reportMaintenanceIssue() {
        return "Maintenance issue reported successfully.";
    }

    @GetMapping("/housekeeping")
    @PreAuthorize("hasRole('ROLE_HOUSEKEEPING') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    public String viewHousekeepingTasks() {
        return "List of housekeeping tasks.";
    }

    @PostMapping("/housekeeping")
    @PreAuthorize("hasRole('ROLE_HOUSEKEEPING') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    public String updateHousekeepingStatus() {
        return "Housekeeping status updated successfully.";
    }

//    @GetMapping("/management")
//    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
//    public ResponseEntity<List<User>> getManagers() {
//        List<User> managers = userRepository.findByRole("ROLE_MANAGER");
//        return ResponseEntity.ok().body(managers);
//    }


    @GetMapping("/management")
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    public String viewManagementDashboard() {
        return "Management dashboard.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String viewAdminDashboard() {
        return "Admin dashboard.";
    }
}

