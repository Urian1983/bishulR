package com.example.eCommerceDemo.service.user;

import com.example.eCommerceDemo.dto.request.LoginRequestDTO;
import com.example.eCommerceDemo.dto.request.RegisterRequestDTO;
import com.example.eCommerceDemo.dto.request.UserRequestDTO;
import com.example.eCommerceDemo.dto.response.AuthResponseDTO;
import com.example.eCommerceDemo.dto.response.UserResponseDTO;
import com.example.eCommerceDemo.exceptions.NotFoundException;
import com.example.eCommerceDemo.exceptions.NullObjectException;
import com.example.eCommerceDemo.exceptions.UserAlreadyExistsException;
import com.example.eCommerceDemo.mapper.user.UserMapper;
import com.example.eCommerceDemo.model.Cart;
import com.example.eCommerceDemo.model.Role;
import com.example.eCommerceDemo.model.User;
import com.example.eCommerceDemo.repository.CartRepository;
import com.example.eCommerceDemo.repository.UserRepository;
import com.example.eCommerceDemo.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final CartRepository cartRepository;


    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, UserMapper userMapper, CartRepository cartRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userMapper = userMapper;
        this.cartRepository = cartRepository;
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(NotFoundException::new);

        String token = jwtService.generateToken(user);

        return AuthResponseDTO.builder()
                .token(token)
                .build();
    }

    @Override
    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        if (userRepository.findByEmail(registerRequestDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException();
        }

        if (!registerRequestDTO.getPassword().equals(registerRequestDTO.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = new User();
        user.setEmail(registerRequestDTO.getEmail());
        user.setName(registerRequestDTO.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        user.setRoles(Set.of(Role.USER));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCreatedAt(LocalDateTime.now());
        cart.setUpdatedAt(LocalDateTime.now());
        cart.setTotalPrice(BigDecimal.ZERO);
        cart.setCartItems(new ArrayList<>());
        cartRepository.save(cart);

        String token = jwtService.generateToken(user);
        return AuthResponseDTO.builder().token(token).build();
    }

    @Override
    public UserResponseDTO getUserById(Long userId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(NotFoundException::new);

        return userMapper.toDTO(user);
    }

    @Override
    public UserResponseDTO updateUser(Long userId, UserRequestDTO userRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(NotFoundException::new);

        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);
        return userMapper.toDTO(user);
    }

    @Override
    public void deleteUser(Long userId) {
        if(!userRepository. existsById(userId)) {
            throw new NullObjectException();
        }
        userRepository.deleteById(userId);
    }
}
