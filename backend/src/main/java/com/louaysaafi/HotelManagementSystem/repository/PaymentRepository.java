package com.louaysaafi.HotelManagementSystem.repository;

import com.louaysaafi.HotelManagementSystem.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
