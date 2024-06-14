package com.louaysaafi.HotelManagementSystem.repositories;

import com.louaysaafi.HotelManagementSystem.models.OrderManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderManagementRepository extends JpaRepository<OrderManagement, Long> {
}
