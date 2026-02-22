package com.techprime.desafio.dtos.requests;

import com.techprime.desafio.entities.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderRequestDTO(
        @NotBlank(message = "O nome é obrigatório") String customerName,
        @NotBlank(message = "O e-mail é obrigatório") @Email(message = "E-mail inválido") String customerEmail,
        @NotBlank(message = "O endereço é obrigatório") String customerAddress,
        @NotNull(message = "A forma de pagamento é obrigatória") PaymentMethod paymentMethod,

        @NotEmpty(message = "O pedido deve ter pelo menos um item")

        @Valid
        List<OrderItemRequestDTO> items
) {}