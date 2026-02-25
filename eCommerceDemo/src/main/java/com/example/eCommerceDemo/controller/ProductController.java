package com.example.eCommerceDemo.controller;

import com.example.eCommerceDemo.dto.request.ProductRequestDTO;
import com.example.eCommerceDemo.dto.response.ProductResponseDTO;
import com.example.eCommerceDemo.service.product.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "Endpoints used for products management")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @Operation(
            summary = "To create a new product",
            description = "Creates a new product, stores it in the database and returns its DTO",
            tags = { "Products" }
    )
    ResponseEntity<ProductResponseDTO> create(@Valid
                                              @RequestBody
                                              ProductRequestDTO productRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(productRequestDTO));
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "To update an existent product",
            description = "Updated and existent product, stores it in the database and returns its DTO",
            tags = { "Products" }
    )
    ResponseEntity<ProductResponseDTO> update(@PathVariable Long id,
                                              @Valid
                                              @RequestBody
                                              ProductRequestDTO
                                                      productRequestDTO) {
        ProductResponseDTO DTO =productService.updateProduct(productRequestDTO, id);
        return ResponseEntity.ok().body(DTO);
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "To get an existant product",
            description = "Returns the DTO of an existent product already stored in the database",
            tags = { "Products" }
    )
    ResponseEntity<ProductResponseDTO> getProduct(@PathVariable Long id) {
        ProductResponseDTO DTO = productService.getById(id);
        return ResponseEntity.ok().body(DTO);
    }

    @DeleteMapping("/{id}")
    @Operation(
            summary = "To delete an existent product",
            description = "Deletes forever en existent product",
            tags = { "Products" }
    )
    ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    @Operation(
            summary = "Returns all available products",
            description = "Return all available products",
            tags = { "Products" }
    )
    ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> DTO = productService.getAllProducts();
        return ResponseEntity.ok().body(DTO);
    }
}
