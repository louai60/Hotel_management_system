package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.CleaningDetail;
import com.louaysaafi.HotelManagementSystem.services.CleaningDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cleaning-details")
public class CleaningDetailController {

    private final CleaningDetailService cleaningDetailService;

    @Autowired
    public CleaningDetailController(CleaningDetailService cleaningDetailService) {
        this.cleaningDetailService = cleaningDetailService;
    }

    @GetMapping
    public List<CleaningDetail> getAllCleaningDetails() {
        return cleaningDetailService.getAllCleaningDetails();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CleaningDetail> getCleaningDetailById(@PathVariable Long id) {
        Optional<CleaningDetail> cleaningDetail = cleaningDetailService.getCleaningDetailById(id);
        return cleaningDetail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CleaningDetail createCleaningDetail(@RequestBody CleaningDetail cleaningDetail) {
        return cleaningDetailService.createCleaningDetail(cleaningDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CleaningDetail> updateCleaningDetail(@PathVariable Long id, @RequestBody CleaningDetail cleaningDetailDetails) {
        Optional<CleaningDetail> existingCleaningDetail = cleaningDetailService.getCleaningDetailById(id);
        if (existingCleaningDetail.isPresent()) {
            CleaningDetail updatedCleaningDetail = existingCleaningDetail.get();
            updatedCleaningDetail.setBedsMade(cleaningDetailDetails.getBedsMade());
            updatedCleaningDetail.setBathroomsCleaned(cleaningDetailDetails.getBathroomsCleaned());
            updatedCleaningDetail.setTrashEmptied(cleaningDetailDetails.getTrashEmptied());
            updatedCleaningDetail.setTowelsReplaced(cleaningDetailDetails.getTowelsReplaced());
            updatedCleaningDetail.setAmenitiesReplaced(cleaningDetailDetails.getAmenitiesReplaced());
            updatedCleaningDetail.setProductsUsed(cleaningDetailDetails.getProductsUsed());
            return ResponseEntity.ok(cleaningDetailService.createCleaningDetail(updatedCleaningDetail));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCleaningDetail(@PathVariable Long id) {
        cleaningDetailService.deleteCleaningDetail(id);
        return ResponseEntity.noContent().build();
    }
}
