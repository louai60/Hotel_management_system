package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.StockCategory;
import com.louaysaafi.HotelManagementSystem.service.StockCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock-categories")
public class StockCategoryController {

    @Autowired
    private StockCategoryService stockCategoryService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<List<StockCategory>> getAllStockCategories() {
        List<StockCategory> stockCategories = stockCategoryService.getAllStockCategories();
        return ResponseEntity.ok(stockCategories);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<StockCategory> getStockCategoryById(@PathVariable Long id) {
        return stockCategoryService.getStockCategoryById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StockCategory> createStockCategory(@RequestBody StockCategory stockCategory) {
        StockCategory savedStockCategory = stockCategoryService.saveStockCategory(stockCategory);
        return ResponseEntity.ok(savedStockCategory);
    }

//    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<StockCategory> updateStockCategory(@PathVariable Long id, @RequestBody StockCategory stockCategory) {
//        return stockCategoryService.updateStockCategory(id, stockCategory)
//                .map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStockCategory(@PathVariable Long id) {
        stockCategoryService.deleteStockCategory(id);
        return ResponseEntity.noContent().build();
    }
}
