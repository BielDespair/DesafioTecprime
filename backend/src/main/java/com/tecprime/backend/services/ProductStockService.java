package com.tecprime.backend.services;

import com.tecprime.backend.entities.ProductStock;
import com.tecprime.backend.repositories.ProductStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class ProductStockService {

    private final ProductStockRepository stockRepository;

    // Se o produto não tiver sido salvo no estoque ainda (retorno da api fake), ele cria um estoque simulado
    private ProductStock getOrGenerateStock(Long productId) {
        return stockRepository.findById(productId)
                .orElseGet(() -> {
                    int randomQty = ThreadLocalRandom.current().nextInt(10, 21);
                    return stockRepository.save(new ProductStock(productId, randomQty));
                });
    }

    @Transactional
    public Integer getStockById(Long productId) {
        ProductStock stock = getOrGenerateStock(productId);
        return stock.getQuantity();
    }

    @Transactional
    public void decreaseStock(Long productId, Integer quantity) {
        ProductStock stock = getOrGenerateStock(productId);
        stock.decreaseStock(quantity);
        stockRepository.save(stock);
    }
}