package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.FollowUpAndValidation;
import com.louaysaafi.HotelManagementSystem.services.FollowUpAndValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/follow-up-and-validations")
public class FollowUpAndValidationController {

    private final FollowUpAndValidationService followUpAndValidationService;

    @Autowired
    public FollowUpAndValidationController(FollowUpAndValidationService followUpAndValidationService) {
        this.followUpAndValidationService = followUpAndValidationService;
    }

    // Endpoint pour récupérer tous les follow-up and validations
    @GetMapping
    public ResponseEntity<List<FollowUpAndValidation>> getAllFollowUpAndValidations() {
        List<FollowUpAndValidation> followUpAndValidations = followUpAndValidationService.getAllFollowUpAndValidations();
        return ResponseEntity.ok(followUpAndValidations);
    }

    // Endpoint pour récupérer un follow-up and validation par ID
    @GetMapping("/{id}")
    public ResponseEntity<FollowUpAndValidation> getFollowUpAndValidationById(@PathVariable Long id) {
        Optional<FollowUpAndValidation> followUpAndValidation = followUpAndValidationService.getFollowUpAndValidationById(id);
        return followUpAndValidation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint pour créer un nouveau follow-up and validation
    @PostMapping
    public ResponseEntity<FollowUpAndValidation> createFollowUpAndValidation(@RequestBody FollowUpAndValidation followUpAndValidation) {
        FollowUpAndValidation createdFollowUpAndValidation = followUpAndValidationService.createFollowUpAndValidation(followUpAndValidation);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFollowUpAndValidation);
    }

    // Endpoint pour mettre à jour un follow-up and validation existant
    @PutMapping("/{id}")
    public ResponseEntity<FollowUpAndValidation> updateFollowUpAndValidation(@PathVariable Long id, @RequestBody FollowUpAndValidation updatedFollowUpAndValidation) {
        FollowUpAndValidation updatedEntity = followUpAndValidationService.updateFollowUpAndValidation(id, updatedFollowUpAndValidation);
        if (updatedEntity != null) {
            return ResponseEntity.ok(updatedEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint pour supprimer un follow-up and validation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFollowUpAndValidation(@PathVariable Long id) {
        followUpAndValidationService.deleteFollowUpAndValidation(id);
        return ResponseEntity.noContent().build();
    }
}
