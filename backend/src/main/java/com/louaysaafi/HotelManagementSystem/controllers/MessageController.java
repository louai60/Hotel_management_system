package com.louaysaafi.HotelManagementSystem.controllers;

import com.louaysaafi.HotelManagementSystem.models.Message;
import com.louaysaafi.HotelManagementSystem.models.User;
import com.louaysaafi.HotelManagementSystem.repositories.MessageRepository;
import com.louaysaafi.HotelManagementSystem.repositories.UserRepository;
import com.louaysaafi.HotelManagementSystem.services.MessageService;
import com.louaysaafi.HotelManagementSystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @GetMapping("/{senderId}/{receiverId}")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(
            @PathVariable Long senderId,
            @PathVariable Long receiverId) {
        Optional<User> sender = userRepository.findById(senderId);
        Optional<User> receiver = userRepository.findById(receiverId);

        if (sender.isPresent() && receiver.isPresent()) {
            List<Message> messages = messageService.getMessagesBetweenUsers(sender.get(), receiver.get());
            return ResponseEntity.ok(messages);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        Message savedMessage = messageRepository.save(message);
        String roomId = getRoomId(message.getSender().getId(), message.getReceiver().getId());
        messagingTemplate.convertAndSend("/queue/private-" + roomId, message);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            List<Message> messages = messageRepository.findBySenderOrReceiver(user.get(), user.get());
            return ResponseEntity.ok(messages);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @MessageMapping("/chat.sendMessage")
    public void handleWebSocketMessage(Message message) {
        messageRepository.save(message);
        String roomId = getRoomId(message.getSender().getId(), message.getReceiver().getId());
        messagingTemplate.convertAndSend("/queue/private-" + roomId, message);
    }

    private String getRoomId(Long senderId, Long receiverId) {
        return senderId < receiverId ? senderId + "-" + receiverId : receiverId + "-" + senderId;
    }
}
