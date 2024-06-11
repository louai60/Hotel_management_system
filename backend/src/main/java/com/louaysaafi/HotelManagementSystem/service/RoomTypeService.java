package com.louaysaafi.HotelManagementSystem.service;

import com.louaysaafi.HotelManagementSystem.models.RoomType;
import com.louaysaafi.HotelManagementSystem.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public Optional<RoomType> getRoomTypeById(Long id) {
        return roomTypeRepository.findById(id);
    }

    public RoomType saveRoomType(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    public Optional<RoomType> updateRoomType(Long id, RoomType roomType) {
        return roomTypeRepository.findById(id).map(existingRoomType -> {
            existingRoomType.setTypeName(roomType.getTypeName());
            existingRoomType.setDescription(roomType.getDescription());
            return roomTypeRepository.save(existingRoomType);
        });
    }

    public void deleteRoomType(Long id) {
        roomTypeRepository.deleteById(id);
    }
}
