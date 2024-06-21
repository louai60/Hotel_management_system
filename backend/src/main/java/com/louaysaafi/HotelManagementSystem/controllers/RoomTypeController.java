package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.RoomType;
import com.louaysaafi.HotelManagementSystem.services.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roomTypes")
public class RoomTypeController {
    @Autowired
    private RoomTypeService roomTypeService;

    @GetMapping
    public List<RoomType> getAllRoomTypes() {
        return roomTypeService.getAllRoomTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomType> getRoomTypeById(@PathVariable Long id) {
        Optional<RoomType> roomType = roomTypeService.getRoomTypeById(id);
        if (roomType.isPresent()) {
            return ResponseEntity.ok(roomType.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public RoomType createRoomType(@RequestBody RoomType roomType) {
        return roomTypeService.saveRoomType(roomType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomType> updateRoomType(@PathVariable Long id, @RequestBody RoomType roomTypeDetails) {
        Optional<RoomType> roomType = roomTypeService.getRoomTypeById(id);
        if (roomType.isPresent()) {
            RoomType updatedRoomType = roomType.get();
            updatedRoomType.setTypeName(roomTypeDetails.getTypeName());
            updatedRoomType.setDescription(roomTypeDetails.getDescription());
            updatedRoomType.setPrice(roomTypeDetails.getPrice());
            return ResponseEntity.ok(roomTypeService.saveRoomType(updatedRoomType));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoomType(@PathVariable Long id) {
        roomTypeService.deleteRoomType(id);
        return ResponseEntity.noContent().build();
    }
}
