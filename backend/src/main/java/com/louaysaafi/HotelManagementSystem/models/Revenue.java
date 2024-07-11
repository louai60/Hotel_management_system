package com.louaysaafi.HotelManagementSystem.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Revenue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private Double directRevenue;
    private Double indirectRevenue;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getDirectRevenue() {
        return directRevenue;
    }

    public void setDirectRevenue(Double directRevenue) {
        this.directRevenue = directRevenue;
    }

    public Double getIndirectRevenue() {
        return indirectRevenue;
    }

    public void setIndirectRevenue(Double indirectRevenue) {
        this.indirectRevenue = indirectRevenue;
    }
}
