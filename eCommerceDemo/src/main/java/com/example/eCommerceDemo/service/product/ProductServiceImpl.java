package com.example.eCommerceDemo.service.product;

import com.example.eCommerceDemo.dto.request.ProductRequestDTO;
import com.example.eCommerceDemo.dto.response.ProductResponseDTO;
import com.example.eCommerceDemo.exceptions.NotFoundException;
import com.example.eCommerceDemo.mapper.product.ProductMapperImpl;
import com.example.eCommerceDemo.model.Product;
import com.example.eCommerceDemo.repository.ProductRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapperImpl productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapperImpl productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO)
    {
        Product newProduct = productMapper.toEntity(productRequestDTO);
        newProduct.setSlug(productRequestDTO.getName().toLowerCase().replace(" ", "-"));
        productRepository.save(newProduct);

        return productMapper.toDTO(newProduct);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ProductResponseDTO updateProduct(ProductRequestDTO productRequestDTO, Long id) {
        Product productToUpdate = productRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        Product tempProduct = productMapper.toEntity(productRequestDTO);

        productToUpdate.setName(tempProduct.getName());
        productToUpdate.setSku(tempProduct.getSku());
        productToUpdate.setSlug(tempProduct.getName().toLowerCase().replace(" ", "-"));
        productToUpdate.setDescription(tempProduct.getDescription());
        productToUpdate.setShortDescription(tempProduct.getShortDescription());
        productToUpdate.setBrand(tempProduct.getBrand());
        productToUpdate.setUpdatedAt(LocalDateTime.now());
        productToUpdate.setCategory(tempProduct.getCategory());
        productToUpdate.setPrice(tempProduct.getPrice());
        productToUpdate.setStock(tempProduct.getStock());

        productRepository.save(productToUpdate);
        return productMapper.toDTO(productToUpdate);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(Long id) {
        if(!productRepository.existsById(id))
        {
            throw new NotFoundException();
        }

        productRepository.deleteById(id);
    }

    @Override
    public ProductResponseDTO getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        return productMapper.toDTO(product);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {

        List<ProductResponseDTO> products = new ArrayList<>();
        for(Product product : productRepository.findAll()){
            products.add(productMapper.toDTO(product));
        }
        return products;
    }
}
