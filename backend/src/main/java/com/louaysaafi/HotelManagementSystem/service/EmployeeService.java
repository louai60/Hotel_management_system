package com.louaysaafi.HotelManagementSystem.service;

import com.louaysaafi.HotelManagementSystem.models.Employee;
import com.louaysaafi.HotelManagementSystem.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Optional<Employee> updateEmployee(Long id, Employee employee) {
        return employeeRepository.findById(id).map(existingEmployee -> {
            existingEmployee.setUser(employee.getUser());
            existingEmployee.setDateOfBirth(employee.getDateOfBirth());
            existingEmployee.setDateOfHire(employee.getDateOfHire());
            existingEmployee.setSalary(employee.getSalary());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setCreatedAt(employee.getCreatedAt());
            existingEmployee.setUpdatedAt(employee.getUpdatedAt());
            return employeeRepository.save(existingEmployee);
        });
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
