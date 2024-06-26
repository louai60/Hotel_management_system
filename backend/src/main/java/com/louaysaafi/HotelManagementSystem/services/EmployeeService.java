package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Employee;
import com.louaysaafi.HotelManagementSystem.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployeesWithUserDetails() {
        List<Employee> employees = employeeRepository.findAll();
        employees.forEach(employee -> {
            // Load user details eagerly if necessary
            employee.getUser().getFirstName();
            employee.getUser().getLastName();
            employee.getUser().getEmail();
        });
        return employees;
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
    	employee.setCreatedAt(new Date());
    	employee.setUpdatedAt(new Date());
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
