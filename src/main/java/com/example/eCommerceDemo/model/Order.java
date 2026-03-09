package com.example.eCommerceDemo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="order_number", nullable = false, unique = true)
    private String orderNumber;

    @Column(name="table_number")
    private int tableNumber;

    @Column(name="status",nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name="created_at",nullable=false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name="updated_at", nullable=false)
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Column(name="payment_method",nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name="total_price",nullable = false)
    @NotNull
    @Min(value = 0, message = "Price cannot be negative")
    private BigDecimal totalPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "order",
    cascade = CascadeType.ALL,
    orphanRemoval = true)
    private List<OrderItem> orderItems;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
