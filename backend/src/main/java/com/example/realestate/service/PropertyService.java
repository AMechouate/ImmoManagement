package com.example.realestate.service;

import com.example.realestate.dto.PropertyRequestDto;
import com.example.realestate.dto.PropertyResponseDto;
import java.math.BigDecimal;
import java.util.List;

public interface PropertyService {
    PropertyResponseDto createProperty(PropertyRequestDto requestDto);

    List<PropertyResponseDto> getAllProperties();

    PropertyResponseDto getPropertyById(Long id);

    PropertyResponseDto updateProperty(Long id, PropertyRequestDto requestDto);

    void deleteProperty(Long id);

    List<PropertyResponseDto> filterProperties(String city, BigDecimal minPrice, BigDecimal maxPrice);
}
