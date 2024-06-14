package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.DescriptionOfTheIntervention;
import com.louaysaafi.HotelManagementSystem.repositories.DescriptionOfTheInterventionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DescriptionOfTheInterventionService {
    private final DescriptionOfTheInterventionRepository descriptionOfTheInterventionRepository;

    @Autowired
    public DescriptionOfTheInterventionService(DescriptionOfTheInterventionRepository descriptionOfTheInterventionRepository) {
        this.descriptionOfTheInterventionRepository = descriptionOfTheInterventionRepository;
    }

    // CRUD operations

    public List<DescriptionOfTheIntervention> getAllDescriptionOfTheInterventions() {
        return descriptionOfTheInterventionRepository.findAll();
    }

    public Optional<DescriptionOfTheIntervention> getDescriptionOfTheInterventionById(Long id) {
        return descriptionOfTheInterventionRepository.findById(id);
    }

    public DescriptionOfTheIntervention createDescriptionOfTheIntervention(DescriptionOfTheIntervention descriptionOfTheIntervention) {
        return descriptionOfTheInterventionRepository.save(descriptionOfTheIntervention);
    }

    public DescriptionOfTheIntervention updateDescriptionOfTheIntervention(Long id, DescriptionOfTheIntervention updatedDescriptionOfTheIntervention) {
        // Check if the descriptionOfTheIntervention with the given id exists
        if (descriptionOfTheInterventionRepository.existsById(id)) {
            updatedDescriptionOfTheIntervention.setId(id); // Set the ID of the updated descriptionOfTheIntervention
            return descriptionOfTheInterventionRepository.save(updatedDescriptionOfTheIntervention);
        } else {
            // Handle error: descriptionOfTheIntervention not found
            return null;
        }
    }

    public void deleteDescriptionOfTheIntervention(Long id) {
        // Check if the descriptionOfTheIntervention with the given id exists
        if (descriptionOfTheInterventionRepository.existsById(id)) {
            descriptionOfTheInterventionRepository.deleteById(id);
        } else {
            // Handle error: descriptionOfTheIntervention not found
        }
    }

    // Add any additional methods as needed for specific business logic
}
