package com.example.eCommerceDemo.dto.response;

import com.example.eCommerceDemo.model.PaymentMethod;
import com.example.eCommerceDemo.model.Status;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Schema(description = "Response containing full order details")
public class OrderResponseDTO {

    @Schema(description = "Unique order identifier", example = "1")
    private Long id;

    @Schema(description = "Business order number", example = "ORD-12345")
    private String orderNumber;

    @Schema(description = "Restaurant table number", example = "5")
    private int tableNumber;

    @Schema(description = "Current status of the order")
    private Status status;

    @Schema(description = "Timestamp when the order was placed")
    private LocalDateTime createdAt;

    @Schema(description = "Timestamp of the last status update")
    private LocalDateTime updatedAt;

    @Schema(description = "Payment method selected for the order")
    private PaymentMethod paymentMethod;

    @Schema(description = "Total price of the order", example = "99.99")
    private BigDecimal totalPrice;

    @Schema(description = "Summary of the user who placed the order")
    private UserSummaryDTO userSummaryDTO;

    @ArraySchema(schema = @Schema(description = "List of individual items in the order"))
    private List<OrderItemResponseDTO> orderItems;
}
