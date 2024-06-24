package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.HouseKeepingService;
import com.louaysaafi.HotelManagementSystem.services.HouseKeepingServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/house-keeping-services")
public class HouseKeepingServiceController {

    private final HouseKeepingServiceService houseKeepingServiceService;

    @Autowired
    public HouseKeepingServiceController(HouseKeepingServiceService houseKeepingServiceService) {
        this.houseKeepingServiceService = houseKeepingServiceService;
    }

    @GetMapping
    public List<HouseKeepingService> getAllHouseKeepingServices() {
        return houseKeepingServiceService.getAllHouseKeepingServices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HouseKeepingService> getHouseKeepingServiceById(@PathVariable Long id) {
        Optional<HouseKeepingService> houseKeepingService = houseKeepingServiceService.getHouseKeepingServiceById(id);
        return houseKeepingService.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public HouseKeepingService createHouseKeepingService(@RequestBody HouseKeepingService houseKeepingService) {
        return houseKeepingServiceService.createHouseKeepingService(houseKeepingService);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HouseKeepingService> updateHouseKeepingService(@PathVariable Long id, @RequestBody HouseKeepingService houseKeepingServiceDetails) {
        HouseKeepingService updatedHouseKeepingService = houseKeepingServiceService.updateHouseKeepingService(id, houseKeepingServiceDetails);
        if (updatedHouseKeepingService != null) {
            return ResponseEntity.ok(updatedHouseKeepingService);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHouseKeepingService(@PathVariable Long id) {
        houseKeepingServiceService.deleteHouseKeepingService(id);
        return ResponseEntity.noContent().build();
    }
}
