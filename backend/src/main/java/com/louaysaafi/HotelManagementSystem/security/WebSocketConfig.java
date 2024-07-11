package com.louaysaafi.HotelManagementSystem.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue/");
        config.setApplicationDestinationPrefixes("/app");
    }


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Replace the wildcard "*" with specific allowed origins
        registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:5173").withSockJS();
    }
}
