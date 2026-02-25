package com.example.eCommerceDemo.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductResponseDTO {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String imageUrl;
    private String sku;
    private String slug;
    private String name;
    private String brand;
    private String category;
    private String description;
    private String shortDescription;
    private int stock;
    private BigDecimal price;

}
