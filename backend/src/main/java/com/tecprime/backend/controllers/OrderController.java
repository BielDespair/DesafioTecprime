package com.tecprime.backend.controllers;

import com.tecprime.backend.dtos.requests.OrderRequestDTO;
import com.tecprime.backend.dtos.responses.OrderResponseDTO;
import com.tecprime.backend.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Inseguro. Allow * apenas para fins do desafio.
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Map<String, UUID>> createOrder(@Valid @RequestBody OrderRequestDTO request) {

        String subject = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        Long userId = Long.parseLong(subject);
        UUID orderId = orderService.createOrder(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("orderId", orderId));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponseDTO> getOrder(@PathVariable UUID orderId) {
        OrderResponseDTO order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders() {

        String subject = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        Long userId = Long.parseLong(subject);
        List<OrderResponseDTO> userOrders = orderService.getOrdersByUserId(userId);

        return ResponseEntity.ok(userOrders);
    }
}