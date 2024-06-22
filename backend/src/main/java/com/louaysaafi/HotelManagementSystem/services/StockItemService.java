package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.StockItem;
import com.louaysaafi.HotelManagementSystem.repositories.StockItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class StockItemService {
    @Autowired
    private StockItemRepository stockItemRepository;

    public List<StockItem> getAllStockItems() {
        return stockItemRepository.findAll();
    }

    public Optional<StockItem> getStockItemById(Long id) {
        return stockItemRepository.findById(id);
    }

    public StockItem saveStockItem(StockItem stockItem) {
    	stockItem.setCreatedAt(new Date());
    	stockItem.setUpdatedAt(new Date());
        return stockItemRepository.save(stockItem);
    }

    public Optional<StockItem> updateStockItem(Long id, StockItem stockItem) {
        return stockItemRepository.findById(id).map(existingStockItem -> {
            existingStockItem.setCategory(stockItem.getCategory());
//            existingStockItem.setUser(stockItem.getUser());
            existingStockItem.setName(stockItem.getName());
            existingStockItem.setQuantity(stockItem.getQuantity());
            existingStockItem.setUnitPrice(stockItem.getUnitPrice());
            existingStockItem.setSupplier(stockItem.getSupplier());
            existingStockItem.setLastOrderDate(stockItem.getLastOrderDate());
            return stockItemRepository.save(existingStockItem);
        });
    }

    public void deleteStockItem(Long id) {
        stockItemRepository.deleteById(id);
    }
}
