package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Employee;
import com.louaysaafi.HotelManagementSystem.models.EmployeeRolePercentage;
import com.louaysaafi.HotelManagementSystem.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmployeeRolePercentage> getRolePercentages() {
        List<Employee> employees = employeeRepository.findAll();

        // Calculate percentages
        Map<String, Long> roleCounts = employees.stream()
                .collect(Collectors.groupingBy(Employee::getRole, Collectors.counting()));

        List<EmployeeRolePercentage> rolePercentages = new ArrayList<>();
        long totalEmployees = employees.size();

        roleCounts.forEach((role, count) -> {
            double percentage = (count.doubleValue() / totalEmployees) * 100;
            rolePercentages.add(new EmployeeRolePercentage(role, percentage));
        });

        return rolePercentages;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        // Set timestamps for creation and update
        Date now = new Date();
        employee.setCreatedAt(now);
        employee.setUpdatedAt(now);
        return employeeRepository.save(employee);
    }

    public Optional<Employee> updateEmployee(Long id, Employee updatedEmployee) {
        return employeeRepository.findById(id).map(existingEmployee -> {
            existingEmployee.setDateOfBirth(updatedEmployee.getDateOfBirth());
            existingEmployee.setDateOfHire(updatedEmployee.getDateOfHire());
            existingEmployee.setSalary(updatedEmployee.getSalary());
            existingEmployee.setBonuses(updatedEmployee.getBonuses());
            existingEmployee.setBenefits(updatedEmployee.getBenefits());
            existingEmployee.setFirstName(updatedEmployee.getFirstName());
            existingEmployee.setLastName(updatedEmployee.getLastName());
            existingEmployee.setEmail(updatedEmployee.getEmail());
            existingEmployee.setRole(updatedEmployee.getRole());
            existingEmployee.setPhone(updatedEmployee.getPhone());
            existingEmployee.setUpdatedAt(new Date()); // Update the timestamp
            return employeeRepository.save(existingEmployee);
        });
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
