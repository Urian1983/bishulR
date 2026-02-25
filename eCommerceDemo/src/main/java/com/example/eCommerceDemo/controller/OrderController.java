package com.example.eCommerceDemo.controller;

import com.example.eCommerceDemo.dto.request.OrderRequestDTO;
import com.example.eCommerceDemo.dto.response.OrderResponseDTO;
import com.example.eCommerceDemo.model.Status;
import com.example.eCommerceDemo.model.User;
import com.example.eCommerceDemo.service.order.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
@Validated
@Tag(name = "Order", description = "Endpoints used for order management")
public class OrderController {

    private final OrderService orderService;

    @Operation(
            summary = "Create a new order",
            description = "Creates a new order for the authenticated user based on the provided order details. " +
                    "Returns the created order with its generated ID, status, and associated items."
    )
    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(@AuthenticationPrincipal User user,
                                                        @RequestBody OrderRequestDTO orderRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.createOrder(user.getId(), orderRequestDTO));
    }

    @Operation(
            summary = "Get order by ID",
            description = "Retrieves a specific order by its unique identifier. " +
                    "Returns the complete order information including status, items, and user details."
    )
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @Operation(
            summary = "Get orders of authenticated user",
            description = "Retrieves all orders associated with the currently authenticated user. " +
                    "Returns a list of orders placed by the user."
    )
    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.getMyOrders(user.getId()));
    }

    @Operation(
            summary = "Get all orders",
            description = "Retrieves all orders in the system. " +
                    "Typically used by administrators to view every order regardless of user."
    )
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @Operation(
            summary = "Update order status",
            description = "Updates the status of an existing order (e.g., PENDING, SHIPPED, DELIVERED, CANCELLED). " +
                    "Returns the updated order with the new status."
    )
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponseDTO> updateStatus(@PathVariable Long id,
                                                         @RequestParam Status status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }

    @Operation(
            summary = "Cancel order",
            description = "Cancels an existing order if it is eligible for cancellation. " +
                    "Returns the updated order with its status changed to CANCELLED."
    )
    @PutMapping("/{id}/cancel")
    public ResponseEntity<OrderResponseDTO> cancelOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.cancelOrder(id));
    }
}


