package com.example.eCommerceDemo.service.cart;

import com.example.eCommerceDemo.dto.request.CartItemRequestDTO;
import com.example.eCommerceDemo.dto.response.CartResponseDTO;
import com.example.eCommerceDemo.exceptions.NotFoundException;
import com.example.eCommerceDemo.mapper.cart.CartMapper;
import com.example.eCommerceDemo.mapper.cartItem.CartItemMapper;
import com.example.eCommerceDemo.model.Cart;
import com.example.eCommerceDemo.model.CartItem;
import com.example.eCommerceDemo.model.Product;
import com.example.eCommerceDemo.repository.CartRepository;
import com.example.eCommerceDemo.repository.ProductRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    private final CartItemMapper cartItemMapper;
    private final ProductRepository productRepository;

    public CartServiceImpl(CartRepository cartRepository, CartMapper cartMapper, CartItemMapper cartItemMapper, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.cartMapper = cartMapper;
        this.cartItemMapper = cartItemMapper;
        this.productRepository = productRepository;
    }

    @Override
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public CartResponseDTO getCart(Long userId) {
        Cart cartToGet = cartRepository.findByUserId(userId)
                .orElseThrow(NotFoundException::new);

        return cartMapper.toDto(cartToGet);
    }

    @Override
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public CartResponseDTO addItem(CartItemRequestDTO cartItemRequestDTO, Long userId) {
        Cart cartToGet = cartRepository.findByUserId(userId)
                .orElseThrow(NotFoundException::new);

        Product product = productRepository.findById(cartItemRequestDTO.getProductId())
                .orElseThrow(NotFoundException::new);

        CartItem cartItem = cartItemMapper.toEntity(cartItemRequestDTO);
        cartItem.setCart(cartToGet);
        cartToGet.getCartItems().add(cartItem);

        cartItem.setProduct(product);
        cartItem.setCreatedAt(LocalDateTime.now());
        cartItem.setUpdatedAt(LocalDateTime.now());

        cartRepository.save(cartToGet);
        return cartMapper.toDto(cartToGet);
    }

    @Override
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public CartResponseDTO updateItem(CartItemRequestDTO cartItemRequestDTO, Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(NotFoundException::new);

        CartItem itemToUpdate = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(cartItemRequestDTO.getProductId()))
                .findFirst()
                .orElseThrow(NotFoundException::new);

        itemToUpdate.setQuantity(cartItemRequestDTO.getQuantity());
        itemToUpdate.setUpdatedAt(LocalDateTime.now());
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);

        return cartMapper.toDto(cart);
    }

    @Override
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public CartResponseDTO removeItem(Long cartItemId, Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(NotFoundException::new);

        CartItem itemToRemove = cart.getCartItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(NotFoundException::new);

        cart.getCartItems().remove(itemToRemove);
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);

        return cartMapper.toDto(cart);
    }

    @Override
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public CartResponseDTO clearCart(Long userId) {
        Cart cartToClear = cartRepository.findByUserId(userId)
                .orElseThrow(NotFoundException::new);

        cartToClear.getCartItems().clear();
        cartToClear.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cartToClear);

        return cartMapper.toDto(cartToClear);
    }
}
