package com.example.eCommerceDemo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name="created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = false, name="updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Column(name="image_product")
    String imageUrl;

    @Column(unique = true,nullable = false, name="SKU")
    private String sku;

    @Column(unique = true,nullable = false, name="slug")
    private String slug;

    @Column(nullable= false, name="name")
    private String name;

    @Column(name="description", length=1000)
    private String description;

    @Column(name="shortDescription")
    private String shortDescription;

    @Column(name="brand",nullable=false,length=100)
    private String brand;

    @Column(name="stock")
    private int stock;

    @Column(nullable = false,name="price")
    private BigDecimal price;

    @Column(name="category",nullable=false,length=100)
    private String category;

}
