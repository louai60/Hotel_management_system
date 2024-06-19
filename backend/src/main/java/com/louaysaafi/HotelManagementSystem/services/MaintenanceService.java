package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Maintenance;
import com.louaysaafi.HotelManagementSystem.repositories.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceService {
    private final MaintenanceRepository maintenanceRepository;

    @Autowired
    public MaintenanceService(MaintenanceRepository maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }

    // CRUD operations

    public List<Maintenance> getAllMaintenances() {
        return maintenanceRepository.findAll();
    }

    public Optional<Maintenance> getMaintenanceById(Long id) {
        return maintenanceRepository.findById(id);
    }

    public Maintenance createMaintenance(Maintenance maintenance) {
        return maintenanceRepository.save(maintenance);
    }

    public Maintenance updateMaintenance(Maintenance updatedMaintenance) {
        // Check if the maintenance with the given id exists
        if (maintenanceRepository.existsById(id)) {
            updatedMaintenance.setId(id); // Set the ID of the updated maintenance
            return maintenanceRepository.save(updatedMaintenance);
        } else {
            // Handle error: maintenance not found
            return null;
        }
    }

    public void deleteMaintenance(Long id) {
        // Check if the maintenance with the given id exists
        if (maintenanceRepository.existsById(id)) {
            maintenanceRepository.deleteById(id);
        } else {
            // Handle error: maintenance not found
        }
    }

    // Add any additional methods as needed for specific business logic
}
