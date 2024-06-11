package com.louaysaafi.HotelManagementSystem.repository;


import com.louaysaafi.HotelManagementSystem.models.ERole;
import com.louaysaafi.HotelManagementSystem.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
