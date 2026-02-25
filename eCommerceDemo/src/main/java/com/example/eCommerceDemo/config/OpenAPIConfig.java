package com.example.eCommerceDemo.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("Sprint 5 Task 2 Documentation")
                        .description("API documentation for eCommerce application with JWT authentication")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Josep Julià Roca Blanco")
                                .email("urian1983@proton.me")))
                .tags(Arrays.asList(
                        new Tag().name("Authentication").description("Authentication endpoints"),
                        new Tag().name("Products").description("Product management endpoints"),
                        new Tag().name("Categories").description("Category management endpoints"),
                        new Tag().name("Brands").description("Brand management endpoints"),
                        new Tag().name("Cart").description("Shopping cart endpoints"),
                        new Tag().name("Orders").description("Order management endpoints"),
                        new Tag().name("Payments").description("Payment processing endpoints"),
                        new Tag().name("Users").description("User management endpoints")
                ))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Provide the JWT token. Example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'")))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName));
    }
}