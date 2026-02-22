package com.tecprime.backend.services;

import com.tecprime.backend.dtos.FakeStoreProductDTO;
import com.tecprime.backend.dtos.requests.OrderItemRequestDTO;
import com.tecprime.backend.dtos.requests.OrderRequestDTO;
import com.tecprime.backend.dtos.responses.OrderItemResponseDTO;
import com.tecprime.backend.dtos.responses.OrderResponseDTO;
import com.tecprime.backend.entities.Order;
import com.tecprime.backend.entities.OrderItem;
import com.tecprime.backend.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductStockService stockService;
    private final RestTemplate restTemplate;

    @Transactional
    public UUID createOrder(OrderRequestDTO dto, Long userId) {
        Order order = new Order();
        order.setUserId(userId);
        order.setCustomerName(dto.customerName());
        order.setCustomerEmail(dto.customerEmail());
        order.setCustomerAddress(dto.customerAddress());
        order.setPaymentMethod(dto.paymentMethod());

        for (OrderItemRequestDTO itemDto : dto.items()) {
            String apiUrl = "https://fakestoreapi.com/products/" + itemDto.productId();
            FakeStoreProductDTO productFromApi = restTemplate.getForObject(apiUrl, FakeStoreProductDTO.class);

            if (productFromApi == null) {
                throw new IllegalArgumentException("Produto ID " + itemDto.productId() + " não existe na loja.");
            }
            stockService.decreaseStock(itemDto.productId(), itemDto.quantity());

            OrderItem item = new OrderItem();
            item.setProductId(itemDto.productId());
            item.setQuantity(itemDto.quantity());
            item.setPrice(productFromApi.price());

            order.addItem(item);
        }

        Order savedOrder = orderRepository.save(order);
        return savedOrder.getOrderId();
    }

    public OrderResponseDTO getOrderById(UUID orderId) {
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Pedido não encontrado"));

        var itemsDTO = order.getItems().stream()
                .map(item -> new OrderItemResponseDTO(item.getProductId(), item.getQuantity(), item.getPrice()))
                .collect(Collectors.toList());

        return new OrderResponseDTO(
                order.getOrderId(),
                order.getCustomerName(),
                order.getCustomerEmail(),
                order.getCustomerAddress(),
                order.getPaymentMethod(),
                itemsDTO
        );
    }

    public List<OrderResponseDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findAllByUserId(userId);

        return orders.stream().map(order -> {
            var itemsDTO = order.getItems().stream()
                    .map(item -> new OrderItemResponseDTO(item.getProductId(), item.getQuantity(), item.getPrice()))
                    .collect(Collectors.toList());

            return new OrderResponseDTO(
                    order.getOrderId(),
                    order.getCustomerName(),
                    order.getCustomerEmail(),
                    order.getCustomerAddress(),
                    order.getPaymentMethod(),
                    itemsDTO
            );
        }).collect(Collectors.toList());
    }
}