package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.Pool;
import com.louaysaafi.HotelManagementSystem.services.PoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pools")
public class PoolController {
    private final PoolService poolService;

    @Autowired
    public PoolController(PoolService poolService) {
        this.poolService = poolService;
    }

    @GetMapping
    public List<Pool> getAllPools() {
        return poolService.getAllPools();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pool> getPoolById(@PathVariable Long id) {
        Optional<Pool> pool = poolService.getPoolById(id);
        return pool.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pool createPool(@RequestBody Pool pool) {
        return poolService.createPool(pool);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pool> updatePool(@PathVariable Long id, @RequestBody Pool updatedPool) {
        updatedPool.setId(id);
        Pool updated = poolService.updatePool(updatedPool);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePool(@PathVariable Long id) {
        poolService.deletePool(id);
        return ResponseEntity.noContent().build();
    }
}
