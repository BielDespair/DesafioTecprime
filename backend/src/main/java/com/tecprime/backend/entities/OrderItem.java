package com.tecprime.backend.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    private long productId;
    private Integer quantity;
    private BigDecimal price;


    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
}
