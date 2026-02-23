package com.example.eCommerceDemo.controller;

import com.example.eCommerceDemo.dto.request.ProductRequestDTO;
import com.example.eCommerceDemo.dto.response.ProductResponseDTO;
import com.example.eCommerceDemo.service.product.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    ResponseEntity<ProductResponseDTO> create(@Valid
                                              @RequestBody
                                              ProductRequestDTO productRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(productRequestDTO));
    }

    @PutMapping("/{id}")
    ResponseEntity<ProductResponseDTO> update(@PathVariable Long id,
                                              @Valid
                                              @RequestBody
                                              ProductRequestDTO
                                                      productRequestDTO) {
        ProductResponseDTO DTO =productService.updateProduct(productRequestDTO, id);
        return ResponseEntity.ok().body(DTO);
    }

    @GetMapping("/{id}")
    ResponseEntity<ProductResponseDTO> getProduct(@PathVariable Long id) {
        ProductResponseDTO DTO = productService.getById(id);
        return ResponseEntity.ok().body(DTO);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> DTO = productService.getAllProducts();
        return ResponseEntity.ok().body(DTO);
    }
}
