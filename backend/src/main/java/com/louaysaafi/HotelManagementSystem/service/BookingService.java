package com.louaysaafi.HotelManagementSystem.service;

import com.louaysaafi.HotelManagementSystem.models.Booking;
import com.louaysaafi.HotelManagementSystem.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Optional<Booking> updateBooking(Long id, Booking booking) {
        return bookingRepository.findById(id).map(existingBooking -> {
            existingBooking.setUser(booking.getUser());
            existingBooking.setRoom(booking.getRoom());
            existingBooking.setCheckInDate(booking.getCheckInDate());
            existingBooking.setCheckOutDate(booking.getCheckOutDate());
            existingBooking.setStatus(booking.getStatus());
//            existingBooking.setCreatedAt(booking.getCreatedAt());
//            existingBooking.setUpdatedAt(booking.getUpdatedAt());
            return bookingRepository.save(existingBooking);
        });
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
