package com.louaysaafi.HotelManagementSystem.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.louaysaafi.HotelManagementSystem.models.Accounting;
import com.louaysaafi.HotelManagementSystem.services.AccountingService;

@RestController
@RequestMapping("/api/accounting")
public class AccountingController {

    @Autowired
    private AccountingService accountingService;

    @GetMapping
    public List<Accounting> getAllAccountings() {
        return accountingService.getAllAccountings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accounting> getAccountingById(@PathVariable Long id) {
        Optional<Accounting> accounting = accountingService.getAccountingById(id);
        return accounting.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Accounting createAccounting(@RequestBody Accounting accounting) {
        return accountingService.createAccounting(accounting);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Accounting> updateAccounting(@PathVariable Long id, @RequestBody Accounting accountingDetails) {
        Optional<Accounting> existingAccounting = accountingService.getAccountingById(id);
        if (existingAccounting.isPresent()) {
            Accounting updatedAccounting = existingAccounting.get();
            updatedAccounting.setPeriodCovered(accountingDetails.getPeriodCovered());
            updatedAccounting.setTotalExpenses(accountingDetails.getTotalExpenses());
            updatedAccounting.setTotalRooms(accountingDetails.getTotalRooms());
            updatedAccounting.setReportAuthor(accountingDetails.getReportAuthor());
//            updatedAccounting.setUser(accountingDetails.getUser());
            return ResponseEntity.ok(accountingService.createAccounting(updatedAccounting));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccounting(@PathVariable Long id) {
        accountingService.deleteAccounting(id);
        return ResponseEntity.noContent().build();
    }
}
