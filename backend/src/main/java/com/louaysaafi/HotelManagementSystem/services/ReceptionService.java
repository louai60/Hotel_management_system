package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Reception;
import com.louaysaafi.HotelManagementSystem.repositories.ReceptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReceptionService {
    private final ReceptionRepository receptionRepository;

    @Autowired
    public ReceptionService(ReceptionRepository receptionRepository) {
        this.receptionRepository = receptionRepository;
    }

    // CRUD operations

    public List<Reception> getAllReceptions() {
        return receptionRepository.findAll();
    }

    public Optional<Reception> getReceptionById(Long id) {
        return receptionRepository.findById(id);
    }

    public Reception createReception(Reception reception) {
        reception.setCreatedAt(new Date());
        reception.setUpdatedAt(new Date());
        return receptionRepository.save(reception);
    }

    public Reception updateReception(Long id, Reception updatedReception) {
        // Check if the reception with the given id exists
        if (receptionRepository.existsById(id)) {
            updatedReception.setId(id); // Set the ID of the updated reception
            return receptionRepository.save(updatedReception);
        } else {
            // Handle error: reception not found
            return null;
        }
    }

    public void deleteReception(Long id) {
        // Check if the reception with the given id exists
        if (receptionRepository.existsById(id)) {
            receptionRepository.deleteById(id);
        } else {
            // Handle error: reception not found
        }
    }

    // Add any additional methods as needed for specific business logic
}
