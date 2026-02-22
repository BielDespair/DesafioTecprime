package com.techprime.desafio.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        // Damos um nome interno para o esquema de segurança
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("API - Desafio Tecprime")
                        .version("1.0.0")
                        .description("API REST para o mini sistema de compras online desenvolvido para o desafio técnico."))

                // 1. Diz que a API toda exige esse esquema de segurança (adiciona os cadeados nas rotas)
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))

                // 2. Ensina o Swagger O QUE É esse esquema (um token JWT via header Authorization)
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                );
    }
}