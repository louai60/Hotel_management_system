package com.louaysaafi.HotelManagementSystem.repositories;

import com.louaysaafi.HotelManagementSystem.models.Revenue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevenueRepository extends JpaRepository<Revenue, Long> {
}
