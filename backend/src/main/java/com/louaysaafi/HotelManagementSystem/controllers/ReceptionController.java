package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.Reception;
import com.louaysaafi.HotelManagementSystem.models.Payment;
import com.louaysaafi.HotelManagementSystem.services.ReceptionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/receptions")
public class ReceptionController {

    @Autowired
    private ReceptionService receptionService;

    @PostMapping
    public ResponseEntity<?> createReception(@RequestBody Reception reception) {
        try {
            Reception savedReception = receptionService.createReception(reception);
            return ResponseEntity.ok(savedReception);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/{receptionId}/payments")
    public ResponseEntity<?> createPaymentForReception(@PathVariable Long receptionId, @RequestBody Payment payment) {
        try {
            Reception reception = receptionService.findById(receptionId);
            if (reception == null) {
                return ResponseEntity.notFound().build();
            }

            // Set payment details to reception
            reception.setPayment(payment);

            // Update the reception with the payment information
            Reception updatedReception = receptionService.createReception(reception);

            return ResponseEntity.ok(updatedReception);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
