package com.louaysaafi.HotelManagementSystem.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

import java.util.Date;

@Entity
@Table(name = "cleaning_details")
public class CleaningDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "beds_made")
	private Boolean bedsMade;

	@Column(name = "bathrooms_cleaned")
	private Boolean bathroomsCleaned;

	@Column(name = "trash_emptied")
	private Boolean trashEmptied;

	@Column(name = "towels_replaced")
	private Boolean towelsReplaced;

	@Column(name = "amenities_replaced")
	private Boolean amenitiesReplaced;

	@Column(name = "products_used")
	private String productsUsed;

	@Column(name = "agent_name")
	private String agentName;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date updatedAt;

	public CleaningDetail() {
		super();
	}

	// Getters and setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getBedsMade() {
		return bedsMade;
	}

	public void setBedsMade(Boolean bedsMade) {
		this.bedsMade = bedsMade;
	}

	public Boolean getBathroomsCleaned() {
		return bathroomsCleaned;
	}

	public void setBathroomsCleaned(Boolean bathroomsCleaned) {
		this.bathroomsCleaned = bathroomsCleaned;
	}

	public Boolean getTrashEmptied() {
		return trashEmptied;
	}

	public void setTrashEmptied(Boolean trashEmptied) {
		this.trashEmptied = trashEmptied;
	}

	public Boolean getTowelsReplaced() {
		return towelsReplaced;
	}

	public void setTowelsReplaced(Boolean towelsReplaced) {
		this.towelsReplaced = towelsReplaced;
	}

	public Boolean getAmenitiesReplaced() {
		return amenitiesReplaced;
	}

	public void setAmenitiesReplaced(Boolean amenitiesReplaced) {
		this.amenitiesReplaced = amenitiesReplaced;
	}

	public String getProductsUsed() {
		return productsUsed;
	}

	public void setProductsUsed(String productsUsed) {
		this.productsUsed = productsUsed;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
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

	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

}
