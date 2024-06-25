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
        Optional<Reception> existingReception = receptionRepository.findById(id);
        if (existingReception.isPresent()) {
            Reception receptionToUpdate = existingReception.get();
            receptionToUpdate.setClientName(updatedReception.getClientName());
            receptionToUpdate.setCheckInDate(updatedReception.getCheckInDate());
            receptionToUpdate.setCheckOutDate(updatedReception.getCheckOutDate());
            receptionToUpdate.setStatus(updatedReception.getStatus());
            receptionToUpdate.setNumberOfGuests(updatedReception.getNumberOfGuests());
            receptionToUpdate.setSpecialRequests(updatedReception.getSpecialRequests());
            receptionToUpdate.setUpdatedAt(new Date());

            return receptionRepository.save(receptionToUpdate);
        } else {
            // Handle error: reception not found
            return null;
        }
    }

    public void deleteReception(Long id) {
        if (receptionRepository.existsById(id)) {
            receptionRepository.deleteById(id);
        } else {
            // Handle error: reception not found
        }
    }

    public Reception findById(Long receptionId) {
        return receptionRepository.findById(receptionId).orElse(null);
    }
}
