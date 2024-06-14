package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.OrderManagement;
import com.louaysaafi.HotelManagementSystem.repositories.OrderManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderManagementService {
    private final OrderManagementRepository orderManagementRepository;

    @Autowired
    public OrderManagementService(OrderManagementRepository orderManagementRepository) {
        this.orderManagementRepository = orderManagementRepository;
    }

    // CRUD operations

    public List<OrderManagement> getAllOrderManagements() {
        return orderManagementRepository.findAll();
    }

    public Optional<OrderManagement> getOrderManagementById(Long id) {
        return orderManagementRepository.findById(id);
    }

    public OrderManagement createOrderManagement(OrderManagement orderManagement) {
        return orderManagementRepository.save(orderManagement);
    }

    public OrderManagement updateOrderManagement(Long id, OrderManagement updatedOrderManagement) {
        // Check if the orderManagement with the given id exists
        if (orderManagementRepository.existsById(id)) {
            updatedOrderManagement.setId(id); // Set the ID of the updated orderManagement
            return orderManagementRepository.save(updatedOrderManagement);
        } else {
            // Handle error: orderManagement not found
            return null;
        }
    }

    public void deleteOrderManagement(Long id) {
        // Check if the orderManagement with the given id exists
        if (orderManagementRepository.existsById(id)) {
            orderManagementRepository.deleteById(id);
        } else {
            // Handle error: orderManagement not found
        }
    }

    // Add any additional methods as needed for specific business logic
}
