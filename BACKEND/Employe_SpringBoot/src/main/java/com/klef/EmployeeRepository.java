package com.klef;




import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
