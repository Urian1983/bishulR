package com.example.eCommerceDemo.service.product;

import com.example.eCommerceDemo.dto.request.ProductRequestDTO;
import com.example.eCommerceDemo.dto.response.ProductResponseDTO;

import java.util.List;

public interface ProductService {

    ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO);
    ProductResponseDTO updateProduct(ProductRequestDTO productRequestDTO, Long id);
    void delete(Long id);
    ProductResponseDTO getById(Long id);
    List<ProductResponseDTO> getAllProducts();
    void decrementStock(Long productId, int quantity);
}
