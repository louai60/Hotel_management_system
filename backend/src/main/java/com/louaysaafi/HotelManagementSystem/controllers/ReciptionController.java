package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.Reception;
import com.louaysaafi.HotelManagementSystem.services.ReceptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/receptions")
public class ReciptionController {

    @Autowired
    private ReceptionService receptionService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('RECEPTIONIST')")
    public List<Reception> getAllReceptions() {
        return receptionService.getAllReceptions();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('RECEPTIONIST')")
    public ResponseEntity<Reception> getReceptionById(@PathVariable Long id) {
        Optional<Reception> reception = receptionService.getReceptionById(id);
        return reception.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public Reception createReception(@RequestBody Reception reception) {
        return receptionService.createReception(reception);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<Reception> updateReception(@PathVariable Long id, @RequestBody Reception receptionDetails) {
        Optional<Reception> reception = receptionService.getReceptionById(id);
        if (reception.isPresent()) {
            Reception updatedReception = reception.get();
            updatedReception.setPayment(receptionDetails.getPayment());
            updatedReception.setUser(receptionDetails.getUser());
            return ResponseEntity.ok(receptionService.createReception(updatedReception));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<Void> deleteReception(@PathVariable Long id) {
        receptionService.deleteReception(id);
        return ResponseEntity.noContent().build();
    }
}
