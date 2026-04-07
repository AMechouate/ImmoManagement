package com.example.realestate.dto;

import java.math.BigDecimal;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PropertyResponseDto {
    private Long id;
    private String title;
    private String address;
    private String city;
    private BigDecimal price;
    private Double commissionPercent;
    private List<String> photos;
}
