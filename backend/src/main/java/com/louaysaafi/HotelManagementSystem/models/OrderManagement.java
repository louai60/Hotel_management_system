package com.louaysaafi.HotelManagementSystem.models;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class OrderManagement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @Column(nullable = true)
    private String supplier;

    @Column(nullable = true)
    private String requestingDepartment;

    @Column(nullable = true)
    private String ordertatus;

    @Column(nullable = true)
    private Boolean receiptConfirmation;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "orderManagement", cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails;
    
    public OrderManagement () {
		super();
	}

    // Getters and Setters

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getRequestingDepartment() {
        return requestingDepartment;
    }

    public void setRequestingDepartment(String requestingDepartment) {
        this.requestingDepartment = requestingDepartment;
    }

    public String getOrdertatus() {
        return ordertatus;
    }

    public void setOrdertatus(String ordertatus) {
        this.ordertatus = ordertatus;
    }

    public Boolean getReceiptConfirmation() {
        return receiptConfirmation;
    }

    public void setReceiptConfirmation(Boolean receiptConfirmation) {
        this.receiptConfirmation = receiptConfirmation;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderDetails> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
