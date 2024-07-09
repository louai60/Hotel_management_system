package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.Message;
import com.louaysaafi.HotelManagementSystem.models.User;
import com.louaysaafi.HotelManagementSystem.repositories.MessageRepository;
import com.louaysaafi.HotelManagementSystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        logger.info("Received message: {}", message);
        return messageRepository.save(message);
    }

    @GetMapping("/{userId}")
    public List<Message> getMessages(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return messageRepository.findBySenderOrReceiver(user, user);
    }
}
