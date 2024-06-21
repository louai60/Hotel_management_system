package com.louaysaafi.HotelManagementSystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendEmail(String to, String subject, String userName) throws MessagingException {
        // Create a MimeMessage
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        // Set email attributes
        helper.setTo(to);
        helper.setSubject(subject);

        // Create the HTML content using Thymeleaf
        Context context = new Context();
        context.setVariable("userName", userName);
        String htmlContent = templateEngine.process("emailTemplate", context);

        // Set the email content
        helper.setText(htmlContent, true);

        // Send the email
        emailSender.send(message);
    }
}
