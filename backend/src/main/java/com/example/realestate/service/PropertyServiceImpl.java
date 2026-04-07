package com.example.realestate.service;

import com.example.realestate.dto.PropertyRequestDto;
import com.example.realestate.dto.PropertyResponseDto;
import com.example.realestate.mapper.PropertyMapper;
import com.example.realestate.model.Property;
import com.example.realestate.repository.PropertyRepository;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;

    @Override
    public PropertyResponseDto createProperty(PropertyRequestDto requestDto) {
        Property property = propertyMapper.toEntity(requestDto);
        return propertyMapper.toResponseDto(propertyRepository.save(property));
    }

    @Override
    public List<PropertyResponseDto> getAllProperties() {
        return propertyRepository.findAll().stream()
                .map(propertyMapper::toResponseDto)
                .toList();
    }

    @Override
    public PropertyResponseDto getPropertyById(Long id) {
        return propertyMapper.toResponseDto(findByIdOrThrow(id));
    }

    @Override
    public PropertyResponseDto updateProperty(Long id, PropertyRequestDto requestDto) {
        Property property = findByIdOrThrow(id);
        propertyMapper.updateEntity(property, requestDto);
        return propertyMapper.toResponseDto(propertyRepository.save(property));
    }

    @Override
    public void deleteProperty(Long id) {
        Property property = findByIdOrThrow(id);
        propertyRepository.delete(property);
    }

    @Override
    public List<PropertyResponseDto> filterProperties(String city, BigDecimal minPrice, BigDecimal maxPrice) {
        String safeCity = city == null ? "" : city;
        BigDecimal safeMin = minPrice == null ? BigDecimal.ZERO : minPrice;
        BigDecimal safeMax = maxPrice == null ? new BigDecimal("999999999999") : maxPrice;

        return propertyRepository.findByCityContainingIgnoreCaseAndPriceBetween(safeCity, safeMin, safeMax)
                .stream()
                .map(propertyMapper::toResponseDto)
                .toList();
    }

    private Property findByIdOrThrow(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Property not found with id: " + id));
    }
}
