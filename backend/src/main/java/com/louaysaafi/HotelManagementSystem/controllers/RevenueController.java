package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.Revenue;
import com.louaysaafi.HotelManagementSystem.services.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/revenues")
public class RevenueController {
    @Autowired
    private RevenueService revenueService;

    @GetMapping
    public List<Revenue> getAllRevenues() {
        return revenueService.getAllRevenues();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Revenue> getRevenueById(@PathVariable Long id) {
        Revenue revenue = revenueService.getRevenueById(id).orElseThrow(() -> new RuntimeException("Revenue not found"));
        return ResponseEntity.ok(revenue);
    }

    @PostMapping
    public Revenue createRevenue(@RequestBody Revenue revenue) {
        return revenueService.saveRevenue(revenue);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Revenue> updateRevenue(@PathVariable Long id, @RequestBody Revenue revenueDetails) {
        Revenue updatedRevenue = revenueService.updateRevenue(id, revenueDetails);
        return ResponseEntity.ok(updatedRevenue);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRevenue(@PathVariable Long id) {
        revenueService.deleteRevenue(id);
        return ResponseEntity.noContent().build();
    }
}
