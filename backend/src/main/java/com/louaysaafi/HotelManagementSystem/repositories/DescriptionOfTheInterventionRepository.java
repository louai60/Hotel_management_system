package com.louaysaafi.HotelManagementSystem.repositories;

import com.louaysaafi.HotelManagementSystem.models.DescriptionOfTheIntervention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DescriptionOfTheInterventionRepository extends JpaRepository<DescriptionOfTheIntervention, Long> {
}
