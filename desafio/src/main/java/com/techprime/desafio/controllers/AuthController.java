package com.techprime.desafio.controllers;

import com.techprime.desafio.config.security.TokenService;
import com.techprime.desafio.dtos.requests.LoginRequestDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Inseguro, apenas para o desafio!
public class AuthController {

    private final TokenService tokenService;
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequestDTO credentials) {

        if ("admin".equals(credentials.username()) && "123456".equals(credentials.password())) {
            Long userIdLogado = 1L;
            String token = tokenService.generateToken(userIdLogado);
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(401).build();
    }
}