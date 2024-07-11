package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Message;
import com.louaysaafi.HotelManagementSystem.models.User;
import com.louaysaafi.HotelManagementSystem.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Transactional
    public List<Message> getMessagesBetweenUsers(User user1, User user2) {
        return messageRepository.findBySenderAndReceiverOrSenderAndReceiverOrderByTimestampAsc(user1, user2, user2, user1);
    }

    @Transactional
    public Message saveMessage(Message message) {
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }

    // Other methods as needed
}

