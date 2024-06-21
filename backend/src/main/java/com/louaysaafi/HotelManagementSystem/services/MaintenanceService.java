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
        Long id = updatedMaintenance.getId();

        if (id != null && maintenanceRepository.existsById(id)) {
            return maintenanceRepository.save(updatedMaintenance);
        } else {
            return null;
        }
    }

    public void deleteMaintenance(Long id) {
        Optional<Maintenance> maintenanceOptional = maintenanceRepository.findById(id);
        if (maintenanceOptional.isPresent()) {
            maintenanceRepository.delete(maintenanceOptional.get());
        } else {
            throw new IllegalArgumentException("Maintenance record not found for id: " + id);
        }
    }

}
