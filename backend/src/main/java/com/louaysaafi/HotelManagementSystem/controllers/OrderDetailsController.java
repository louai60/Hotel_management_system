package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.OrderDetails;
import com.louaysaafi.HotelManagementSystem.services.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order-details")
public class OrderDetailsController {

    @Autowired
    private OrderDetailsService OrderDetailsService;

    @GetMapping
    public List<OrderDetails> getAllOrderDetailss() {
        return OrderDetailsService.getAllOrderDetails();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetails> getOrderDetailsById(@PathVariable Long id) {
        Optional<OrderDetails> OrderDetails = OrderDetailsService.getOrderDetailsById(id);
        return OrderDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public OrderDetails createOrderDetails(@RequestBody OrderDetails OrderDetails) {
        return OrderDetailsService.createOrderDetails(OrderDetails);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetails> updateOrderDetails(@PathVariable Long id, @RequestBody OrderDetails OrderDetailsDetails) {
        Optional<OrderDetails> OrderDetails = OrderDetailsService.getOrderDetailsById(id);
        if (OrderDetails.isPresent()) {
            OrderDetails updatedOrderDetails = OrderDetails.get();
            updatedOrderDetails.setTotal(OrderDetailsDetails.getTotal());
            updatedOrderDetails.setOrderedProducts(OrderDetailsDetails.getOrderedProducts());
            updatedOrderDetails.setQuantity(OrderDetailsDetails.getQuantity());
            updatedOrderDetails.setUnitPrice(OrderDetailsDetails.getUnitPrice());
            updatedOrderDetails.setTotal(OrderDetailsDetails.getTotal());
            return ResponseEntity.ok(OrderDetailsService.createOrderDetails(updatedOrderDetails));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderDetails(@PathVariable Long id) {
        OrderDetailsService.deleteOrderDetails(id);
        return ResponseEntity.noContent().build();
    }
}
