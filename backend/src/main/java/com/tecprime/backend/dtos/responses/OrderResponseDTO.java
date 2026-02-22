package com.tecprime.backend.dtos.responses;

import com.tecprime.backend.entities.PaymentMethod;

import java.util.List;
import java.util.UUID;

public record OrderResponseDTO(
        UUID orderId,
        String customerName,
        String customerEmail,
        String customerAddress,
        PaymentMethod paymentMethod,
        List<OrderItemResponseDTO> items
) {}
