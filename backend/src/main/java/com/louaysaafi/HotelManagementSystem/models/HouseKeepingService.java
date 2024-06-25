package com.louaysaafi.HotelManagementSystem.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "house_keeping_services")
public class HouseKeepingService {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "cleaning_date")
	private Date cleaningDate;

	@Column(name = "house_keeping_agent")
	private String houseKeepingAgent;

	@Column(name = "priority")
	private String priority;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date updatedAt;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "rooms_has_house_keeping_services", 
	joinColumns = @JoinColumn(name = "house_keeping_service_id"), 
	inverseJoinColumns = @JoinColumn(name = "room_id"))
	private List<Room> rooms;

//	@OneToMany(mappedBy = "houseKeepingService", cascade = CascadeType.ALL)
//	@JsonManagedReference
//	private List<CleaningDetail> cleaningDetails;

	// Getters and Setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCleaningDate() {
		return cleaningDate;
	}

	public void setCleaningDate(Date cleaningDate) {
		this.cleaningDate = cleaningDate;
	}

	public String getHouseKeepingAgent() {
		return houseKeepingAgent;
	}

	public void setHouseKeepingAgent(String houseKeepingAgent) {
		this.houseKeepingAgent = houseKeepingAgent;
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

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}

//	public List<CleaningDetail> getCleaningDetails() {
//		return cleaningDetails;
//	}
//
//	public void setCleaningDetails(List<CleaningDetail> cleaningDetails) {
//		this.cleaningDetails = cleaningDetails;
//	}
	@PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

}
