package com.example.eCommerceDemo.mapper.product;

import com.example.eCommerceDemo.dto.request.ProductRequestDTO;
import com.example.eCommerceDemo.dto.response.ProductResponseDTO;
import com.example.eCommerceDemo.exceptions.NullObjectException;
import com.example.eCommerceDemo.model.Product;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class ProductMapperImpl implements ProductMapper{
    @Override
    public ProductResponseDTO toDTO(Product product) {
        if(product==null){
            throw new NullObjectException();
        }

        ProductResponseDTO DTO = new ProductResponseDTO();

        DTO.setId(product.getId());
        DTO.setCreatedAt(product.getCreatedAt());
        DTO.setUpdatedAt(product.getUpdatedAt());
        DTO.setImageUrl(product.getImageUrl());
        DTO.setSku(product.getSku());
        DTO.setSlug(product.getSlug());
        DTO.setCategory(product.getCategory());
        DTO.setName(product.getName());
        DTO.setBrand(product.getBrand());
        DTO.setDescription(product.getDescription());
        DTO.setShortDescription(product.getShortDescription());
        DTO.setStock(product.getStock());
        DTO.setPrice(product.getPrice());

        return DTO;

    }

    @Override
    public Product toEntity(ProductRequestDTO productRequestDTO) {
        if(productRequestDTO ==null){
            throw new NullObjectException();
        }
        Product product = new Product();

        product.setName(productRequestDTO.getName());
        product.setSku(productRequestDTO.getSku());
        product.setImageUrl(productRequestDTO.getImageUrl());
        product.setDescription(productRequestDTO.getDescription());
        product.setShortDescription(productRequestDTO.getShortDescription());
        product.setBrand(productRequestDTO.getBrand());
        product.setCategory(productRequestDTO.getCategory());
        product.setCreatedAt(LocalDateTime.now());
        product.setPrice(productRequestDTO.getPrice());
        product.setStock(productRequestDTO.getStock());

        return product;
    }
}
