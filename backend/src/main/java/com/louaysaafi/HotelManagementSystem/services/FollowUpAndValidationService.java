package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.FollowUpAndValidation;
import com.louaysaafi.HotelManagementSystem.repositories.FollowUpAndValidationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FollowUpAndValidationService {
    private final FollowUpAndValidationRepository followUpAndValidationRepository;

    @Autowired
    public FollowUpAndValidationService(FollowUpAndValidationRepository followUpAndValidationRepository) {
        this.followUpAndValidationRepository = followUpAndValidationRepository;
    }

    // CRUD operations

    public List<FollowUpAndValidation> getAllFollowUpAndValidations() {
        return followUpAndValidationRepository.findAll();
    }

    public Optional<FollowUpAndValidation> getFollowUpAndValidationById(Long id) {
        return followUpAndValidationRepository.findById(id);
    }

    public FollowUpAndValidation createFollowUpAndValidation(FollowUpAndValidation followUpAndValidation) {
    	followUpAndValidation.setCreatedAt(new Date());
    	followUpAndValidation.setUpdatedAt(new Date());
    	return followUpAndValidationRepository.save(followUpAndValidation);
    }

    public FollowUpAndValidation updateFollowUpAndValidation(Long id, FollowUpAndValidation updatedFollowUpAndValidation) {
        // Check if the followUpAndValidation with the given id exists
        if (followUpAndValidationRepository.existsById(id)) {
            updatedFollowUpAndValidation.setId(id); // Set the ID of the updated followUpAndValidation
            return followUpAndValidationRepository.save(updatedFollowUpAndValidation);
        } else {
            // Handle error: followUpAndValidation not found
            return null;
        }
    }

    public void deleteFollowUpAndValidation(Long id) {
        // Check if the followUpAndValidation with the given id exists
        if (followUpAndValidationRepository.existsById(id)) {
            followUpAndValidationRepository.deleteById(id);
        } else {
            // Handle error: followUpAndValidation not found
        }
    }

    // Add any additional methods as needed for specific business logic
}
