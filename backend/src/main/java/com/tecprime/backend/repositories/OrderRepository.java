package com.tecprime.backend.repositories;

import com.tecprime.backend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderId(UUID orderId);

    List<Order> findAllByUserId(Long userId);
}
