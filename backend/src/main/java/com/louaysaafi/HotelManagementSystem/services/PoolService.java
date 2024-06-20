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

    public List<Pool> getAllPools() {
        return poolRepository.findAll();
    }

    public Optional<Pool> getPoolById(Long id) {
        return poolRepository.findById(id);
    }

    public Pool createPool(Pool pool) {
        return poolRepository.save(pool);
    }

    public Pool updatePool(Pool updatedPool) {
        Long id = updatedPool.getId();

        if (id != null && poolRepository.existsById(id)) {
            return poolRepository.save(updatedPool);
        } else {
            return null;
        }
    }

    public void deletePool(Long id) {
        if (poolRepository.existsById(id)) {
            poolRepository.deleteById(id);
        }
    }
}
