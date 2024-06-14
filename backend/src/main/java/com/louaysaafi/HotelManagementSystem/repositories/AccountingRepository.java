package com.louaysaafi.HotelManagementSystem.repositories;

import com.louaysaafi.HotelManagementSystem.models.Accounting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountingRepository extends JpaRepository<Accounting, Long> {
}
