package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Room;
import com.louaysaafi.HotelManagementSystem.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room saveRoom(Room room) {
    	room.setCreatedAt(new Date());
    	room.setUpdatedAt(new Date());
        // Additional logic, if needed, before saving the room
        return roomRepository.save(room);
    }
    
    public Room updateRoom(Long id, Room updatedRoom) {
        // Check if the room with the given id exists
        Optional<Room> optionalRoom = roomRepository.findById(id);
        if (optionalRoom.isPresent()) {
            updatedRoom.setId(id); // Set the ID of the updated room
            updatedRoom.setUpdatedAt(new Date()); 
            return roomRepository.save(updatedRoom);
        } else {
            // Handle error: room not found
            return null;
        }
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
