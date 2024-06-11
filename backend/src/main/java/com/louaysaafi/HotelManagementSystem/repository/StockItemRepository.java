package com.louaysaafi.HotelManagementSystem.repository;

import com.louaysaafi.HotelManagementSystem.models.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockItemRepository extends JpaRepository<StockItem, Long> {
}
