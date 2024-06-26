package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Payment;
import com.louaysaafi.HotelManagementSystem.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // CRUD operations

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public Payment createPayment(Payment payment) {
//    	payment.setCreatedAt(new Date());
//    	payment.setUpdatedAt(new Date());
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {
        // Check if the payment with the given id exists
        if (paymentRepository.existsById(id)) {
            updatedPayment.setId(id); // Set the ID of the updated payment
            return paymentRepository.save(updatedPayment);
        } else {
            // Handle error: payment not found
            return null;
        }
    }

    public void deletePayment(Long id) {
        // Check if the payment with the given id exists
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
        } else {
            // Handle error: payment not found
        }
    }

    // Add any additional methods as needed for specific business logic
}