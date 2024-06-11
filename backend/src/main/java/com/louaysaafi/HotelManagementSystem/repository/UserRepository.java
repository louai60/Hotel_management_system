//package com.louaysaafi.HotelManagementSystem.repository;
//
//import com.louaysaafi.HotelManagementSystem.models.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface UserRepository extends JpaRepository<User, Long> {
//  Optional<User> findByUsername(String username);
//
//  Boolean existsByUsername(String username);
//
//  Boolean existsByEmail(String email);
//
////  List<User> findByRole(String roleName);
//
//}

package com.louaysaafi.HotelManagementSystem.repository;

import com.louaysaafi.HotelManagementSystem.models.User;
import com.louaysaafi.HotelManagementSystem.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
  Boolean existsByUsername(String username);
  Boolean existsByEmail(String email);
  List<User> findByRolesContains(Role role);
}

