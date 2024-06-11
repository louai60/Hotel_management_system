package com.louaysaafi.HotelManagementSystem.service;

import com.louaysaafi.HotelManagementSystem.models.Payment;
import com.louaysaafi.HotelManagementSystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Optional<Payment> updatePayment(Long id, Payment payment) {
        return paymentRepository.findById(id).map(existingPayment -> {
            existingPayment.setBooking(payment.getBooking());
            existingPayment.setAmount(payment.getAmount());
            existingPayment.setPaymentDate(payment.getPaymentDate());
            existingPayment.setPaymentMethod(payment.getPaymentMethod());
            existingPayment.setStatus(payment.getStatus());
            return paymentRepository.save(existingPayment);
        });
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
