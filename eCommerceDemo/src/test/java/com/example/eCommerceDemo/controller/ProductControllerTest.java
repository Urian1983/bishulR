package com.example.eCommerceDemo.controller;

import com.example.eCommerceDemo.model.Product;
import com.example.eCommerceDemo.service.user.UserService;
import org.mockito.Mock;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test"
)
class ProductControllerTest {

    //Mockeamos la entidad
    @Mock
    private Product product;

}