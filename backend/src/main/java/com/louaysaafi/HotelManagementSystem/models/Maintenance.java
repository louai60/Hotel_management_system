package com.louaysaafi.HotelManagementSystem.models;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "maintenances")
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "intervention_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date interventionDate;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "responsible_technician", nullable = false)
    private String responsibleTechnician;

    @Column(name = "priority", nullable = false)
    private String priority;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @org.hibernate.annotations.CreationTimestamp
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @org.hibernate.annotations.UpdateTimestamp
    private Date updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pool_id")
    private Pool pool;

    @OneToMany(mappedBy = "maintenance", cascade = CascadeType.ALL)
    private List<DescriptionOfTheIntervention> descriptionsOfIntervention;

    @ManyToMany
    @JoinTable(
            name = "maintenances_has_rooms",
            joinColumns = @JoinColumn(name = "maintenance_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id")
    )
    private List<Room> rooms;

    @ManyToMany
    @JoinTable(
            name = "maintenances_has_restaurants",
            joinColumns = @JoinColumn(name = "maintenance_id"),
            inverseJoinColumns = @JoinColumn(name = "restaurant_id")
    )
    private List<Restaurant> restaurants;

    // Constructor
    public Maintenance() {
        super();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getInterventionDate() {
        return interventionDate;
    }

    public void setInterventionDate(Date interventionDate) {
        this.interventionDate = interventionDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getResponsibleTechnician() {
        return responsibleTechnician;
    }

    public void setResponsibleTechnician(String responsibleTechnician) {
        this.responsibleTechnician = responsibleTechnician;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    // No setter for createdAt

    public Date getUpdatedAt() {
        return updatedAt;
    }

    // No setter for updatedAt

    public Pool getPool() {
        return pool;
    }

    public void setPool(Pool pool) {
        this.pool = pool;
    }

    public List<DescriptionOfTheIntervention> getDescriptionsOfIntervention() {
        return descriptionsOfIntervention;
    }

    public void setDescriptionsOfIntervention(List<DescriptionOfTheIntervention> descriptionsOfIntervention) {
        this.descriptionsOfIntervention = descriptionsOfIntervention;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<Restaurant> getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(List<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
}
