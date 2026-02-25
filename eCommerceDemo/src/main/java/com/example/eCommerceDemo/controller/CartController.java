package com.example.eCommerceDemo.controller;

import com.example.eCommerceDemo.dto.request.CartItemRequestDTO;
import com.example.eCommerceDemo.dto.response.CartResponseDTO;
import com.example.eCommerceDemo.model.User;
import com.example.eCommerceDemo.service.cart.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Endpoints used for cart management")
public class CartController {

    private final CartService cartService;

    @Operation(
            summary = "Get current user's cart",
            description = "Retrieves the shopping cart associated with the authenticated user. " +
                    "Returns all cart items including product details and total price."
    )
    @GetMapping
    public ResponseEntity<CartResponseDTO> getCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getCart(user.getId()));
    }

    @Operation(
            summary = "Add item to cart",
            description = "Adds a product to the authenticated user's cart with the specified quantity. " +
                    "If the product already exists in the cart, the quantity may be updated accordingly."
    )
    @PostMapping("/items")
    public ResponseEntity<CartResponseDTO> addItem(@AuthenticationPrincipal User user,
                                                   @Valid @RequestBody CartItemRequestDTO cartItemRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cartService.addItem(cartItemRequestDTO, user.getId()));
    }

    @Operation(
            summary = "Update cart item",
            description = "Updates the quantity of a specific item in the authenticated user's cart. " +
                    "Returns the updated cart with recalculated totals."
    )
    @PutMapping("/items")
    public ResponseEntity<CartResponseDTO> updateItem(@AuthenticationPrincipal User user,
                                                      @Valid @RequestBody CartItemRequestDTO cartItemRequestDTO) {
        return ResponseEntity.ok(cartService.updateItem(cartItemRequestDTO, user.getId()));
    }

    @Operation(
            summary = "Remove item from cart",
            description = "Removes a specific item from the authenticated user's cart using the cart item ID."
    )
    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponseDTO> removeItem(@AuthenticationPrincipal User user,
                                                      @PathVariable Long cartItemId) {
        return ResponseEntity.ok(cartService.removeItem(cartItemId, user.getId()));
    }


    @Operation(
            summary = "Clear cart",
            description = "Removes all items from the authenticated user's shopping cart."
    )
    @DeleteMapping
    public ResponseEntity<CartResponseDTO> clearCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.clearCart(user.getId()));
    }

}