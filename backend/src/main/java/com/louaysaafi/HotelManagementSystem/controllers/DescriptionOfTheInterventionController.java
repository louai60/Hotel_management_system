package com.louaysaafi.HotelManagementSystem.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.louaysaafi.HotelManagementSystem.models.DescriptionOfTheIntervention;
import com.louaysaafi.HotelManagementSystem.services.DescriptionOfTheInterventionService;

@RestController
@RequestMapping("/api/descriptions")
public class DescriptionOfTheInterventionController {

    @Autowired
    private DescriptionOfTheInterventionService descriptionService;

    @GetMapping
    public List<DescriptionOfTheIntervention> getAllDescriptions() {
        return descriptionService.getAllDescriptionOfTheInterventions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DescriptionOfTheIntervention> getDescriptionById(@PathVariable Long id) {
        Optional<DescriptionOfTheIntervention> description = descriptionService.getDescriptionOfTheInterventionById(id);
        return description.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DescriptionOfTheIntervention> createDescription(@RequestBody DescriptionOfTheIntervention description) {
        DescriptionOfTheIntervention createdDescription = descriptionService.createDescriptionOfTheIntervention(description);
        return ResponseEntity.ok(createdDescription);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DescriptionOfTheIntervention> updateDescription(@PathVariable Long id, @RequestBody DescriptionOfTheIntervention descriptionDetails) {
        Optional<DescriptionOfTheIntervention> existingDescription = descriptionService.getDescriptionOfTheInterventionById(id);
        if (existingDescription.isPresent()) {
            DescriptionOfTheIntervention updatedDescription = existingDescription.get();
            
            // Mettre à jour les attributs avec ceux du descriptionDetails
            updatedDescription.setDetectedIssue(descriptionDetails.getDetectedIssue());
            updatedDescription.setDescriptionOfWorkPerformed(descriptionDetails.getDescriptionOfWorkPerformed());
            updatedDescription.setMaterialsUsed(descriptionDetails.getMaterialsUsed());
            updatedDescription.setEstimatedCostOfMaterials(descriptionDetails.getEstimatedCostOfMaterials());
            updatedDescription.setDurationOfIntervation(descriptionDetails.getDurationOfIntervation());
            

            
            // Appel à votre service pour mettre à jour la description
            updatedDescription = descriptionService.updateDescriptionOfTheIntervention(id, updatedDescription);
            
            return ResponseEntity.ok(updatedDescription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDescription(@PathVariable Long id) {
        if (descriptionService.getDescriptionOfTheInterventionById(id).isPresent()) {
            descriptionService.deleteDescriptionOfTheIntervention(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
