package com.techprime.desafio.controllers;


import com.techprime.desafio.dtos.ProductDTO;
import com.techprime.desafio.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Inseguro. Allow * apenas para fins do desafio.
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts() {

        List<ProductDTO> products = productService.getNormalizedProducts();
        return ResponseEntity.ok(products);
    }
}
