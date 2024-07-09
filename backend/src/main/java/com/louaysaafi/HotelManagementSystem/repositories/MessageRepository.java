package com.louaysaafi.HotelManagementSystem.repositories;


import com.louaysaafi.HotelManagementSystem.models.Message;
import com.louaysaafi.HotelManagementSystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderOrReceiver(User sender, User receiver);
}
