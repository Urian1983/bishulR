package com.example.eCommerceDemo.service.product;

import com.example.eCommerceDemo.dto.request.ProductRequestDTO;
import com.example.eCommerceDemo.dto.response.ProductResponseDTO;
import com.example.eCommerceDemo.exceptions.NotFoundException;
import com.example.eCommerceDemo.mapper.product.ProductMapperImpl;
import com.example.eCommerceDemo.model.Product;
import com.example.eCommerceDemo.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapperImpl productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapperImpl productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
        log.info("Creating new product with name: {}", productRequestDTO.getName());

        Product newProduct = productMapper.toEntity(productRequestDTO);
        newProduct.setSlug(
                java.text.Normalizer.normalize(productRequestDTO.getName(), java.text.Normalizer.Form.NFD)
                        .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                        .toLowerCase()
                        .replaceAll("[^a-z0-9]+", "-")
                        .replaceAll("(^-|-$)", "")
        );
        productRepository.save(newProduct);

        log.info("Product created successfully with ID: {} and Slug: {}", newProduct.getId(), newProduct.getSlug());
        return productMapper.toDTO(newProduct);
    }

    @Override
    public ProductResponseDTO updateProduct(ProductRequestDTO productRequestDTO, Long id) {
        log.info("Updating product ID: {}", id);

        Product productToUpdate = productRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Update failed: Product ID {} not found", id);
                    return new NotFoundException();
                });

        Product tempProduct = productMapper.toEntity(productRequestDTO);

        productToUpdate.setName(tempProduct.getName());
        productToUpdate.setSku(tempProduct.getSku());
        productToUpdate.setSlug(productRequestDTO.getName().toLowerCase().replace(" ", "-"));
        productToUpdate.setDescription(tempProduct.getDescription());
        productToUpdate.setShortDescription(tempProduct.getShortDescription());
        productToUpdate.setBrand(tempProduct.getBrand());
        productToUpdate.setCategory(tempProduct.getCategory());
        productToUpdate.setPrice(tempProduct.getPrice());
        productToUpdate.setStock(tempProduct.getStock());

        productRepository.save(productToUpdate);
        log.info("Product ID: {} updated successfully", id);
        return productMapper.toDTO(productToUpdate);
    }

    @Override
    public void delete(Long id) {
        log.info("Attempting to delete product ID: {}", id);

        if(!productRepository.existsById(id)) {
            log.error("Delete failed: Product ID {} does not exist", id);
            throw new NotFoundException();
        }

        productRepository.deleteById(id);
        log.info("Product ID: {} deleted successfully", id);
    }

    @Override
    public ProductResponseDTO getById(Long id) {
        log.debug("Fetching product details for ID: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Product lookup failed: ID {} not found", id);
                    return new NotFoundException();
                });

        return productMapper.toDTO(product);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        log.info("Retrieving all products");

        List<ProductResponseDTO> products = new ArrayList<>();
        for(Product product : productRepository.findAll()){
            products.add(productMapper.toDTO(product));
        }

        log.debug("Found {} products in database", products.size());
        return products;
    }
    @Override
    public void decrementStock(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> {
                    log.error("Stock update failed: Product ID {} not found", productId);
                    return new NotFoundException();
                });

        if (product.getStock() < quantity) {
            log.warn("Insufficient stock for product ID: {}", productId);
            throw new IllegalStateException("Stock insuficiente para: " + product.getName());
        }

        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
        log.info("Stock updated for product ID: {}. New stock: {}", productId, product.getStock());
    }
}
