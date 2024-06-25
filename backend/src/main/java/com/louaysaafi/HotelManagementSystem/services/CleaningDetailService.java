package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.CleaningDetail;
import com.louaysaafi.HotelManagementSystem.repositories.CleaningDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
        cleaningDetail.setCreatedAt(new Date());
        cleaningDetail.setUpdatedAt(new Date());
        return cleaningDetailRepository.save(cleaningDetail);
    }

    public CleaningDetail updateCleaningDetail(Long id, CleaningDetail updatedCleaningDetail) {
        if (cleaningDetailRepository.existsById(id)) {
            updatedCleaningDetail.setId(id); // Set the ID of the updated cleaningDetail
            return cleaningDetailRepository.save(updatedCleaningDetail);
        } else {
            return null;
        }
    }

    public void deleteCleaningDetail(Long id) {
        if (cleaningDetailRepository.existsById(id)) {
            cleaningDetailRepository.deleteById(id);
        } else {
        }
    }
}
