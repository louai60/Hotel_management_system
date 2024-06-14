package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Accounting;
import com.louaysaafi.HotelManagementSystem.repositories.AccountingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountingService {
    private final AccountingRepository accountingRepository;

    @Autowired
    public AccountingService(AccountingRepository accountingRepository) {
        this.accountingRepository = accountingRepository;
    }

    // CRUD operations

    public List<Accounting> getAllAccountings() {
        return accountingRepository.findAll();
    }

    public Optional<Accounting> getAccountingById(Long id) {
        return accountingRepository.findById(id);
    }

    public Accounting createAccounting(Accounting accounting) {
        return accountingRepository.save(accounting);
    }

    public Accounting updateAccounting(Long id, Accounting updatedAccounting) {
        // Check if the accounting with the given id exists
        if (accountingRepository.existsById(id)) {
            updatedAccounting.setId(id); // Set the ID of the updated accounting
            return accountingRepository.save(updatedAccounting);
        } else {
            // Handle error: accounting not found
            return null;
        }
    }

    public void deleteAccounting(Long id) {
        // Check if the accounting with the given id exists
            accountingRepository.deleteById(id);
    }

    // Add any additional methods as needed for specific business logic
}
