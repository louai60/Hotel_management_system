package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.HouseKeepingService;
import com.louaysaafi.HotelManagementSystem.repositories.HouseKeepingServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class HouseKeepingServiceService {
    private final HouseKeepingServiceRepository houseKeepingServiceRepository;

    @Autowired
    public HouseKeepingServiceService(HouseKeepingServiceRepository houseKeepingServiceRepository) {
        this.houseKeepingServiceRepository = houseKeepingServiceRepository;
    }

    // CRUD operations

    public List<HouseKeepingService> getAllHouseKeepingServices() {
        return houseKeepingServiceRepository.findAll();
    }

    public Optional<HouseKeepingService> getHouseKeepingServiceById(Long id) {
        return houseKeepingServiceRepository.findById(id);
    }

    public HouseKeepingService createHouseKeepingService(HouseKeepingService houseKeepingService) {
    	houseKeepingService.setCreatedAt(new Date());
    	houseKeepingService.setUpdatedAt(new Date());
    	return houseKeepingServiceRepository.save(houseKeepingService);
    }

    public HouseKeepingService updateHouseKeepingService(Long id, HouseKeepingService updatedHouseKeepingService) {
        if (houseKeepingServiceRepository.existsById(id)) {
            updatedHouseKeepingService.setId(id); // Set the ID of the updated houseKeepingService
            return houseKeepingServiceRepository.save(updatedHouseKeepingService);
        } else {
            // Handle error: houseKeepingService not found
            return null;
        }
    }

    public void deleteHouseKeepingService(Long id) {
        // Check if the houseKeepingService with the given id exists
        if (houseKeepingServiceRepository.existsById(id)) {
            houseKeepingServiceRepository.deleteById(id);
        } else {
            // Handle error: houseKeepingService not found
        }
    }
}
