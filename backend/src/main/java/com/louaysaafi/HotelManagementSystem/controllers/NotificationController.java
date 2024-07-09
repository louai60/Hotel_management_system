package com.louaysaafi.HotelManagementSystem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/notify")
    public void notifyFrontend() {
        messagingTemplate.convertAndSend("/topic/notifications", "New user has signed up!");
    }
}
