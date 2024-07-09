package com.louaysaafi.HotelManagementSystem.security;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.util.WebUtils;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class CorsHandshakeInterceptor implements HandshakeInterceptor {

    private final CorsConfigurationSource corsConfigurationSource;

    public CorsHandshakeInterceptor(CorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (request instanceof ServletServerHttpRequest && response instanceof ServletServerHttpResponse) {
            HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
            HttpServletResponse servletResponse = ((ServletServerHttpResponse) response).getServletResponse();
            CorsConfiguration corsConfiguration = corsConfigurationSource.getCorsConfiguration((HttpServletRequest) WebUtils.getTempDir((ServletContext) servletRequest));
            if (corsConfiguration != null) {
                corsConfiguration.addAllowedOrigin(servletRequest.getHeader("Origin"));
                corsConfiguration.addAllowedMethod("GET");
                corsConfiguration.addAllowedMethod("POST");
                corsConfiguration.addAllowedMethod("PUT");
                corsConfiguration.addAllowedMethod("DELETE");
                corsConfiguration.addAllowedMethod("OPTIONS");
                corsConfiguration.addAllowedHeader("*");
                corsConfiguration.addExposedHeader("Authorization");
                corsConfiguration.addExposedHeader("Content-Type");
                corsConfiguration.addExposedHeader("Accept");
                corsConfiguration.addExposedHeader("Origin");
                corsConfiguration.addExposedHeader("X-Requested-With");
                corsConfiguration.addExposedHeader("Access-Control-Request-Method");
                corsConfiguration.addExposedHeader("Access-Control-Request-Headers");
                corsConfiguration.setMaxAge(3600L);
                corsConfiguration.setAllowCredentials(true);
                corsConfiguration.applyPermitDefaultValues();
            }
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
    }
}
