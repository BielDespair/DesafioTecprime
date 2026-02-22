package com.techprime.desafio.services;


import com.techprime.desafio.dtos.FakeStoreProductDTO;
import com.techprime.desafio.dtos.ProductDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final RestTemplate restTemplate;
    private final ProductStockService stockService;


    public List<ProductDTO> getNormalizedProducts() {
        String apiUrl = "https://fakestoreapi.com/products";

        FakeStoreProductDTO[] fakeProducts = restTemplate.getForObject(apiUrl, FakeStoreProductDTO[].class);

        if (fakeProducts == null) {
            return List.of();
        }

        return Arrays.stream(fakeProducts)
                .map(fake -> new ProductDTO(
                        fake.id(),
                        fake.title(),
                        fake.description(),
                        fake.price(),
                        stockService.getStockById(fake.id()),
                        fake.image()
                ))
                .collect(Collectors.toList());
    }
}