package com.klef;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/employeeapi")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repo;

    @GetMapping("/")
    public String home() {
        return "Welcome to Employee CRUD Backend!";
    }

    @GetMapping("/klu")
    public String klu() {
        return "Welcome to KLU Employee Management System";
    }

    // CREATE
    @PostMapping("/add")
    public Employee addEmployee(@RequestBody Employee emp) {
        return repo.save(emp);
    }

    // READ ALL
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    // READ ONE
    @GetMapping("/employee/{id}")
    public Employee getEmployee(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee newEmp) {
        Employee emp = repo.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        emp.setName(newEmp.getName());
        emp.setEmail(newEmp.getEmail());
        emp.setDepartment(newEmp.getDepartment());
        return repo.save(emp);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        repo.deleteById(id);
        return "Deleted Employee with ID: " + id;
    }
}
