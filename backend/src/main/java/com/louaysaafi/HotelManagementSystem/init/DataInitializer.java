package com.louaysaafi.HotelManagementSystem.init;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Inserting default roles into database...");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_ADMIN');");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_EMPLOYEE');");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_GUEST');");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_MANAGER');");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_RECEPTIONIST');");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_CHEF');");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_HOUSEKEEPING');");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_MAINTENANCE');");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_MODERATOR');");
        jdbcTemplate.execute("INSERT INTO roles(name) VALUES ('ROLE_PENDING');");
        logger.info("Default roles inserted successfully.");
    }
}
