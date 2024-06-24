package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.OrderDetails;
import com.louaysaafi.HotelManagementSystem.repositories.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailsService {
    private final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public OrderDetailsService(OrderDetailsRepository orderDetailsRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
    }

    // CRUD operations

    public List<OrderDetails> getAllOrderDetails() {
        return orderDetailsRepository.findAll();
    }

    public Optional<OrderDetails> getOrderDetailsById(Long id) {
        return orderDetailsRepository.findById(id);
    }

    public OrderDetails createOrderDetails(OrderDetails orderDetails) {
    	orderDetails.setCreatedAt(new Date());
    	orderDetails.setUpdatedAt(new Date());
        return orderDetailsRepository.save(orderDetails);
    }

    public OrderDetails updateOrderDetails(Long id, OrderDetails updatedOrderDetails) {
        // Check if the orderDetails with the given id exists
        if (orderDetailsRepository.existsById(id)) {
            updatedOrderDetails.setId(id); // Set the ID of the updated orderDetails
            return orderDetailsRepository.save(updatedOrderDetails);
        } else {
            // Handle error: orderDetails not found
            return null;
        }
    }

    public void deleteOrderDetails(Long id) {
        // Check if the orderDetails with the given id exists
        if (orderDetailsRepository.existsById(id)) {
            orderDetailsRepository.deleteById(id);
        } else {
            // Handle error: orderDetails not found
        }
    }

    // Add any additional methods as needed for specific business logic
}
