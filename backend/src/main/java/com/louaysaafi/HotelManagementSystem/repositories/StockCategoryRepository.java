package com.louaysaafi.HotelManagementSystem.repositories;

import com.louaysaafi.HotelManagementSystem.models.StockCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockCategoryRepository extends JpaRepository<StockCategory, Long> {
}
