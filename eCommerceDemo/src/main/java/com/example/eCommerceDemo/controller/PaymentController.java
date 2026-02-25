package com.example.eCommerceDemo.controller;

import com.example.eCommerceDemo.dto.request.PaymentRequestDTO;
import com.example.eCommerceDemo.dto.response.PaymentResponseDTO;
import com.example.eCommerceDemo.model.User;
import com.example.eCommerceDemo.service.payment.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Validated
@Tag(name = "Payment", description = "Endpoints used for the management of the payment")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    @Operation(
            summary = "Simulates a payment process, not a real one",
            description = "Simulates a payment process, not a real one",
            tags = { "Payment" }
    )
    public ResponseEntity<PaymentResponseDTO> processPayment(@AuthenticationPrincipal User user,
                                                             @RequestBody PaymentRequestDTO paymentRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(paymentService.processPayment(paymentRequestDTO, user.getId()));
    }

    @GetMapping("/order/{orderId}")
    @Operation(
            summary = "Returns an already existing payment process",
            description = "Returns an already existing payment process",
            tags = { "Payment" }
    )
    public ResponseEntity<PaymentResponseDTO> getPaymentByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.getPaymentByOrderId(orderId));
    }
}
