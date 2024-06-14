package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.CleaningDetail;
import com.louaysaafi.HotelManagementSystem.repositories.CleaningDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CleaningDetailService {
    private final CleaningDetailRepository cleaningDetailRepository;

    @Autowired
    public CleaningDetailService(CleaningDetailRepository cleaningDetailRepository) {
        this.cleaningDetailRepository = cleaningDetailRepository;
    }

    // CRUD operations

    public List<CleaningDetail> getAllCleaningDetails() {
        return cleaningDetailRepository.findAll();
    }

    public Optional<CleaningDetail> getCleaningDetailById(Long id) {
        return cleaningDetailRepository.findById(id);
    }

    public CleaningDetail createCleaningDetail(CleaningDetail cleaningDetail) {
        return cleaningDetailRepository.save(cleaningDetail);
    }

    public CleaningDetail updateCleaningDetail(Long id, CleaningDetail updatedCleaningDetail) {
        // Check if the cleaningDetail with the given id exists
        if (cleaningDetailRepository.existsById(id)) {
            updatedCleaningDetail.setId(id); // Set the ID of the updated cleaningDetail
            return cleaningDetailRepository.save(updatedCleaningDetail);
        } else {
            // Handle error: cleaningDetail not found
            return null;
        }
    }

    public void deleteCleaningDetail(Long id) {
        // Check if the cleaningDetail with the given id exists
        if (cleaningDetailRepository.existsById(id)) {
            cleaningDetailRepository.deleteById(id);
        } else {
            // Handle error: cleaningDetail not found
        }
    }

    // Add any additional methods as needed for specific business logic
}
