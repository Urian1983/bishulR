package com.example.eCommerceDemo.controller;

import com.example.eCommerceDemo.dto.request.LoginRequestDTO;
import com.example.eCommerceDemo.dto.request.RegisterRequestDTO;
import com.example.eCommerceDemo.dto.response.AuthResponseDTO;
import com.example.eCommerceDemo.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Endpoints used for authentication of users")
public class AuthController {

    private final UserService userService;

    @Operation(
            summary = "User login",
            description = "Authenticates a user using email/username and password credentials. " +
                    "Returns a JWT token along with authentication details if credentials are valid."
    )
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @Operation(
            summary = "User registration",
            description = "Registers a new user in the system with the provided information. " +
                    "Returns a JWT token and user authentication details upon successful registration."
    )
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(userService.register(request));
    }
}