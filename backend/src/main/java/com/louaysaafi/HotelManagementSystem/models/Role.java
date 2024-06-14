package com.louaysaafi.HotelManagementSystem.models;

import javax.persistence.*;
import java.time.LocalDateTime; // Import LocalDateTime
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

//    @Column(name = "created_at", nullable = false, updatable = false) // Add created_at field
//    private LocalDateTime createdAt;
//
//    @Column(name = "updated_at", nullable = false) // Add updated_at field
//    private LocalDateTime updatedAt;

    public Role() {
        super();
    }

    public Role(ERole name) {
        this.name = name;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
//    @PrePersist
//    protected void onCreate() {
//        this.createdAt = new LocalDateTime();
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        this.updatedAt = new LocalDateTime();
//    }
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
//
//    public LocalDateTime getUpdatedAt() {
//        return updatedAt;
//    }
//
//    public void setUpdatedAt(LocalDateTime updatedAt) {
//        this.updatedAt = updatedAt;
//    }
}
