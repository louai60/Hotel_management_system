package com.louaysaafi.HotelManagementSystem.models;

import javax.persistence.*;

import java.util.Date;



@Entity
@Table(name = "descriptions_of_the_intervention")
public class DescriptionOfTheIntervention {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "detected_issue")
    private String detectedIssue;

    @Column(name = "description_of_work_performed", columnDefinition = "LONGTEXT")
    private String descriptionOfWorkPerformed;

    @Column(name = "materials_used", columnDefinition = "LONGTEXT")
    private String materialsUsed;

    @Column(name = "estimated_cost_of_materials")
    private Double estimatedCostOfMaterials;

    @Column(name = "duration_of_intervation")
    private String durationOfIntervation;

    @Column(name = "description_of_the_interventioncol")
    private String descriptionOfTheInterventioncol;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

//    // Relationship to Maintenance
    @ManyToOne(fetch = FetchType.LAZY) // Adjust FetchType based on your requirements
    @JoinColumn(name = "maintenance_id", referencedColumnName = "id")
    private Maintenance maintenance;

    // Relationship to StocksCategory
    @ManyToOne
    @JoinColumn(name = "stock_category_id", nullable = false)
    private StockCategory stockCategory;

//    // Relationship to Room
    @ManyToOne
    @JoinColumn(name = "maintenance_room_id", nullable = false)
    private Room room;

    public DescriptionOfTheIntervention () {
		super();
	}
    // Getters and Setters
    

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDetectedIssue() {
		return detectedIssue;
	}

	public void setDetectedIssue(String detectedIssue) {
		this.detectedIssue = detectedIssue;
	}

	public String getDescriptionOfWorkPerformed() {
		return descriptionOfWorkPerformed;
	}

	public void setDescriptionOfWorkPerformed(String descriptionOfWorkPerformed) {
		this.descriptionOfWorkPerformed = descriptionOfWorkPerformed;
	}

	public String getMaterialsUsed() {
		return materialsUsed;
	}

	public void setMaterialsUsed(String materialsUsed) {
		this.materialsUsed = materialsUsed;
	}

	public Double getEstimatedCostOfMaterials() {
		return estimatedCostOfMaterials;
	}

	public void setEstimatedCostOfMaterials(Double estimatedCostOfMaterials) {
		this.estimatedCostOfMaterials = estimatedCostOfMaterials;
	}

	public String getDurationOfIntervation() {
		return durationOfIntervation;
	}

	public void setDurationOfIntervation(String durationOfIntervation) {
		this.durationOfIntervation = durationOfIntervation;
	}

	public String getDescriptionOfTheInterventioncol() {
		return descriptionOfTheInterventioncol;
	}

	public void setDescriptionOfTheInterventioncol(String descriptionOfTheInterventioncol) {
		this.descriptionOfTheInterventioncol = descriptionOfTheInterventioncol;
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

	public Maintenance getMaintenance() {
		return maintenance;
	}

	public void setMaintenance(Maintenance maintenance) {
		this.maintenance = maintenance;
	}

	public StockCategory getStockCategory() {
		return stockCategory;
	}

	public void setStockCategory(StockCategory stockCategory) {
		this.stockCategory = stockCategory;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
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