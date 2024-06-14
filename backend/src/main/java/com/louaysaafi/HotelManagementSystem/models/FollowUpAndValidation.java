package com.louaysaafi.HotelManagementSystem.models;

import javax.persistence.*;

import java.util.Date;

@Entity
@Table(name = "follow_up_and_validations")
public class FollowUpAndValidation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "post_cleaning_condition", columnDefinition = "TEXT")
    private String postCleaningCondition;
    
    @Column(name = "remarks", columnDefinition = "TEXT")
    private String remarks;
    
    @Column(name = "agent_signature")
    private String agentSignature;
    
    @Column(name = "validation_date")
    private Date validationDate;
    
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
    
    @ManyToOne
    @JoinColumn(name = "cleaning_detail_id")
    private CleaningDetail cleaningDetails;
    
//    @ManyToOne
//    @JoinColumns({
//        @JoinColumn(name = "houseKeeping_service_id", referencedColumnName = "id"),
//        @JoinColumn(name = "houseKeeping_service_room_id", referencedColumnName = "room_id")
//    })
//    private HouseKeepingService houseKeepingService;
    
    public FollowUpAndValidation () {
		super();
	}
    
 // Getters and Setters
    

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPostCleaningCondition() {
		return postCleaningCondition;
	}

	public void setPostCleaningCondition(String postCleaningCondition) {
		this.postCleaningCondition = postCleaningCondition;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getAgentSignature() {
		return agentSignature;
	}

	public void setAgentSignature(String agentSignature) {
		this.agentSignature = agentSignature;
	}

	public Date getValidationDate() {
		return validationDate;
	}

	public void setValidationDate(Date validationDate) {
		this.validationDate = validationDate;
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

	public CleaningDetail getCleaningDetails() {
		return cleaningDetails;
	}

	public void setCleaningDetails(CleaningDetail cleaningDetails) {
		this.cleaningDetails = cleaningDetails;
	}

//	public HouseKeepingService getHouseKeepingService() {
//		return houseKeepingService;
//	}
//
//	public void setHouseKeepingService(HouseKeepingService houseKeepingService) {
//		this.houseKeepingService = houseKeepingService;
//	}
    
    
}
