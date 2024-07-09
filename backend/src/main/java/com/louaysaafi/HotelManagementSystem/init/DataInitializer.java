package com.louaysaafi.HotelManagementSystem.init;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Inserting default roles into database...");

        // List of default roles
        List<String> defaultRoles = List.of("ROLE_ADMIN", "ROLE_EMPLOYEE", "ROLE_GUEST",
                "ROLE_MANAGER", "ROLE_RECEPTIONIST", "ROLE_CHEF", "ROLE_HOUSEKEEPING",
                "ROLE_MAINTENANCE", "ROLE_MODERATOR", "ROLE_PENDING");

        // Check if roles exist before inserting
        for (String roleName : defaultRoles) {
            if (!roleExists(roleName)) {
                jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('" + roleName + "');");
            }
        }

        logger.info("Default roles inserted successfully.");
    }

    private boolean roleExists(String roleName) {
        String query = "SELECT COUNT(*) FROM roles WHERE name = ?";
        Integer count = jdbcTemplate.queryForObject(query, Integer.class, roleName);
        return count != null && count > 0;
    }
}
