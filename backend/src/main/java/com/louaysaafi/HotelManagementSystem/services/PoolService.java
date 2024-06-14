package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Pool;
import com.louaysaafi.HotelManagementSystem.repositories.PoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PoolService {
    private final PoolRepository poolRepository;

    @Autowired
    public PoolService(PoolRepository poolRepository) {
        this.poolRepository = poolRepository;
    }

    // CRUD operations

    public List<Pool> getAllPools() {
        return poolRepository.findAll();
    }

    public Optional<Pool> getPoolById(Long id) {
        return poolRepository.findById(id);
    }

    public Pool createPool(Pool pool) {
        return poolRepository.save(pool);
    }

    public Pool updatePool(Long id, Pool updatedPool) {
        // Check if the pool with the given id exists
        if (poolRepository.existsById(id)) {
            updatedPool.setId(id); // Set the ID of the updated pool
            return poolRepository.save(updatedPool);
        } else {
            // Handle error: pool not found
            return null;
        }
    }

    public void deletePool(Long id) {
        // Check if the pool with the given id exists
        if (poolRepository.existsById(id)) {
            poolRepository.deleteById(id);
        } else {
            // Handle error: pool not found
        }
    }

    // Add any additional methods as needed for specific business logic
}
