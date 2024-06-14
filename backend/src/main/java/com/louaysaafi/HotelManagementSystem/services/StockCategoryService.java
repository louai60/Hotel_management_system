package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.StockCategory;
import com.louaysaafi.HotelManagementSystem.repositories.StockCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockCategoryService {
    @Autowired
    private StockCategoryRepository stockCategoryRepository;

    public List<StockCategory> getAllStockCategories() {
        return stockCategoryRepository.findAll();
    }

    public Optional<StockCategory> getStockCategoryById(Long id) {
        return stockCategoryRepository.findById(id);
    }

    public StockCategory saveStockCategory(StockCategory stockCategory) {
        return stockCategoryRepository.save(stockCategory);
    }

    public Optional<StockCategory> updateStockCategory(Long id, StockCategory stockCategory) {
        return stockCategoryRepository.findById(id).map(existingStockCategory -> {
            existingStockCategory.setName(stockCategory.getName());
            existingStockCategory.setDescription(stockCategory.getDescription());
            existingStockCategory.setUser(stockCategory.getUser());
            return stockCategoryRepository.save(existingStockCategory);
        });
    }

    public void deleteStockCategory(Long id) {
        stockCategoryRepository.deleteById(id);
    }
}
