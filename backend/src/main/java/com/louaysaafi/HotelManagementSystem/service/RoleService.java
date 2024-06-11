package com.louaysaafi.HotelManagementSystem.service;

import com.louaysaafi.HotelManagementSystem.models.ERole;
import com.louaysaafi.HotelManagementSystem.models.Role;
import com.louaysaafi.HotelManagementSystem.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    public Optional<Role> getRoleByName(String name) {
        try {
            ERole roleName = ERole.valueOf(name);
            return roleRepository.findByName(roleName);
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
    }
}
