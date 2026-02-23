package com.example.eCommerceDemo.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDTO {

   @NotBlank
    private String sku;
   @NotBlank
    private String name;
   @NotBlank
   private String brand;
   @NotBlank
   private String imageUrl;
   @NotBlank
    private String description;
   @NotBlank
    private String shortDescription;
   @NotBlank
   private String category;
   @NotNull
   @Min(value = 0, message = "Stock cannot be negative")
    private int stock;
   @NotNull
   @Min(value = 0, message = "Price cannot be negative")
    private BigDecimal price;
}
