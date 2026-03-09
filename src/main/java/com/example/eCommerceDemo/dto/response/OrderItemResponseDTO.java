package com.example.eCommerceDemo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "Response representing a single line item in an order")
public class OrderItemResponseDTO {
    @Schema(description = "Unique identifier for the order item", example = "50")
    private Long id;

    @Schema(description = "ID of the purchased product", example = "101")
    private Long productId;

    @Schema(description = "Quantity purchased", example = "1")
    private int quantity;

    @Schema(description = "Price per unit at the time of purchase", example = "49.99")
    private BigDecimal price;

    @Schema(description = "Name of the purchased product", example = "Paella valenciana")
    private String productName;
}
