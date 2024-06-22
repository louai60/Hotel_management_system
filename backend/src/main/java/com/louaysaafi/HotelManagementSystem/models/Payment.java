package com.louaysaafi.HotelManagementSystem.models;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "status")
    private String status;
    
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    // Relationships
    @OneToOne(mappedBy = "payment", cascade = CascadeType.ALL)
    private Reception reception;
    
    public Payment () {
		super();
	}

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Reception getReception() {
        return reception;
    }

    public void setReception(Reception reception) {
        this.reception = reception;
    }
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}
