package com.tecprime.backend.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_stock")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductStock {
    @Id
    private Long Id;

    private Integer quantity;


    public void decreaseStock(Integer amount) {
        if (this.quantity < amount) {
            throw new IllegalArgumentException("Estoque insuficiente para o produto ID: " + this.getId());
        }
        this.quantity -= amount;
    }
}