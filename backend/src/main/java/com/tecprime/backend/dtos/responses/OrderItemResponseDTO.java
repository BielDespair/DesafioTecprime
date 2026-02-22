package com.tecprime.backend.dtos.responses;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record OrderItemResponseDTO(
        @NotNull(message = "O ID do produto é obrigatório")
        Long productId,

        @NotNull(message = "A quantidade é obrigatória")
        @Min(value = 1, message = "A quantidade mínima é 1")
        Integer quantity,

        @NotNull(message = "O preço é obrigatório")
        BigDecimal price
) {}