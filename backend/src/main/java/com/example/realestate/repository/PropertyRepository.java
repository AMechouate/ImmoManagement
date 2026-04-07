package com.example.realestate.repository;

import com.example.realestate.model.Property;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByCityContainingIgnoreCaseAndPriceBetween(
            String city,
            BigDecimal minPrice,
            BigDecimal maxPrice
    );
}
