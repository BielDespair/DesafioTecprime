package com.techprime.desafio.dtos;

import java.math.BigDecimal;

public record FakeStoreProductDTO(
        Long id,
        String title,
        BigDecimal price,
        String description,
        String image
) {}