package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.Maintenance;
import com.louaysaafi.HotelManagementSystem.services.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> createMaintenance(@RequestBody Maintenance maintenance) {
        Maintenance createdMaintenance = maintenanceService.createMaintenance(maintenance);
        return ResponseEntity.ok(createdMaintenance);
    }

    @GetMapping("/view/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('TECHNICIAN')")
    public ResponseEntity<?> viewMaintenance(@PathVariable("id") Long id) {
        Optional<Maintenance> maintenance = maintenanceService.getMaintenanceById(id);
        if (maintenance == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(maintenance);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('TECHNICIAN')")
    public ResponseEntity<?> updateMaintenance(@PathVariable("id") Long id, @RequestBody Maintenance maintenance) {
        Optional<Maintenance> existingMaintenance = maintenanceService.getMaintenanceById(id);
        if (existingMaintenance == null) {
            return ResponseEntity.notFound().build();
        }
        maintenance.setId(id);
        Maintenance updatedMaintenance = maintenanceService.updateMaintenance(maintenance);
        return ResponseEntity.ok(updatedMaintenance);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> deleteMaintenance(@PathVariable("id") Long id) {
        Optional<Maintenance> existingMaintenance = maintenanceService.getMaintenanceById(id);
        if (existingMaintenance == null) {
            return ResponseEntity.notFound().build();
        }
        maintenanceService.deleteMaintenance(id);
        return ResponseEntity.ok().build();
    }
}
