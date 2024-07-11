package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Revenue;
import com.louaysaafi.HotelManagementSystem.repositories.RevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RevenueService {
    @Autowired
    private RevenueRepository revenueRepository;

    public List<Revenue> getAllRevenues() {
        return revenueRepository.findAll();
    }

    public Optional<Revenue> getRevenueById(Long id) {
        return revenueRepository.findById(id);
    }

    public Revenue saveRevenue(Revenue revenue) {
        return revenueRepository.save(revenue);
    }

    public Revenue updateRevenue(Long id, Revenue revenueDetails) {
        Revenue revenue = revenueRepository.findById(id).orElseThrow(() -> new RuntimeException("Revenue not found"));
        revenue.setDate(revenueDetails.getDate());
        revenue.setDirectRevenue(revenueDetails.getDirectRevenue());
        revenue.setIndirectRevenue(revenueDetails.getIndirectRevenue());
        return revenueRepository.save(revenue);
    }

    public void deleteRevenue(Long id) {
        revenueRepository.deleteById(id);
    }
}
