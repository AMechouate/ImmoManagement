package com.example.realestate.mapper;

import com.example.realestate.dto.PropertyRequestDto;
import com.example.realestate.dto.PropertyResponseDto;
import com.example.realestate.model.Property;
import java.util.ArrayList;
import org.springframework.stereotype.Component;

@Component
public class PropertyMapper {

    public Property toEntity(PropertyRequestDto dto) {
        return Property.builder()
                .title(dto.getTitle())
                .address(dto.getAddress())
                .city(dto.getCity())
                .price(dto.getPrice())
                .commissionPercent(dto.getCommissionPercent())
                .photos(dto.getPhotos() == null ? new ArrayList<>() : dto.getPhotos())
                .build();
    }

    public PropertyResponseDto toResponseDto(Property property) {
        return PropertyResponseDto.builder()
                .id(property.getId())
                .title(property.getTitle())
                .address(property.getAddress())
                .city(property.getCity())
                .price(property.getPrice())
                .commissionPercent(property.getCommissionPercent())
                .photos(property.getPhotos())
                .build();
    }

    public void updateEntity(Property property, PropertyRequestDto dto) {
        property.setTitle(dto.getTitle());
        property.setAddress(dto.getAddress());
        property.setCity(dto.getCity());
        property.setPrice(dto.getPrice());
        property.setCommissionPercent(dto.getCommissionPercent());
        property.setPhotos(dto.getPhotos() == null ? new ArrayList<>() : dto.getPhotos());
    }
}
