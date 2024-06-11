package com.louaysaafi.HotelManagementSystem.repository;

import com.louaysaafi.HotelManagementSystem.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
