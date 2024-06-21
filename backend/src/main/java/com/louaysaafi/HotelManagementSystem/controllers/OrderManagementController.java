package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.OrderManagement;
import com.louaysaafi.HotelManagementSystem.services.OrderManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/OrderManagements")
public class OrderManagementController {

    @Autowired
    private OrderManagementService OrderManagementService;

    @GetMapping
    public List<OrderManagement> getAllOrderManagements() {
        return OrderManagementService.getAllOrderManagements();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderManagement> getOrderManagementById(@PathVariable Long id) {
        Optional<OrderManagement> OrderManagement = OrderManagementService.getOrderManagementById(id);
        return OrderManagement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public OrderManagement createOrderManagement(@RequestBody OrderManagement OrderManagement) {
        return OrderManagementService.createOrderManagement(OrderManagement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderManagement> updateOrderManagement(@PathVariable Long id, @RequestBody OrderManagement OrderManagementDetails) {
        Optional<OrderManagement> OrderManagement = OrderManagementService.getOrderManagementById(id);
        if (OrderManagement.isPresent()) {
            OrderManagement updatedOrderManagement = OrderManagement.get();
            updatedOrderManagement.setOrderDate(OrderManagementDetails.getOrderDate());
//            updatedOrderManagement.setTotalAmount(OrderManagementDetails.getTotalAmount());
            return ResponseEntity.ok(OrderManagementService.createOrderManagement(updatedOrderManagement));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderManagement(@PathVariable Long id) {
        OrderManagementService.deleteOrderManagement(id);
        return ResponseEntity.noContent().build();
    }
}
