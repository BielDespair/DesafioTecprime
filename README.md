# Desafio Full Stack Tecprime

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Aplicação fullstack de e-commerce desenvolvida como solução para o desafio técnico da Tecprime. O sistema contempla desde o consumo de APIs externas de catálogo até o gerenciamento de pedidos e autenticação segura de usuários.

## Arquitetura e Decisões Técnicas

1.  **Backend (Java 21):** Utilização das funcionalidades mais recentes da linguagem (LTS). A arquitetura segue o padrão de camadas (Controller, Service, Repository), e buscando seguir o  Single Responsibility Principle (SRP). 

2.  **Frontend (React + TS):** Implementação de uma **Service Layer** para centralizar requisições HTTP via Axios, evitando acoplamento de lógica de API no código de UI. O estado global é gerenciado via **Context API** (Auth e Cart).

3.  **Implementação de Segurança (JWT):**  **Identidade por Contexto:** O `userId` contido no token é utilizado para buscar os pedidos já realizados pelo usuário anteriormente. Além disso, a tabela order salva o id do usuário que fez o pedido (para ser buscado posteriormente)

3.  **Swagger:** O Swagger foi configurado no backend para melhor visualização das rotas. Não é protegido por autenticação.

## Tecnologias Utilizadas

* **Linguagens:** Java 21, TypeScript
* **Backend:** Maven, Spring Boot, Spring Security, Spring Data JPA, Swagger.
* **Frontend:** React, Vite, Axios, React Router.
* **Banco de Dados:** PostgreSQL.
* **Orquestração:** Docker e Docker Compose.

##  Como Executar o Projeto

**Pré-requisitos:** Docker

1.  **Clonagem do Repositório:**
    ```bash
    git clone https://github.com/BielDespair/DesafioTecprime.git
    cd DesafioTecprime
    ```

2.  **Configuração do Ambiente (.env)**

    Crie um arquivo chamado .env na raiz do projeto com o seguinte conteúdo:
    ```
    DB_NAME=tecprime_db
    DB_USER=postgres
    DB_PASSWORD=admin
    JWT_SECRET=UmaSenhaSuperSecretaECompridaParaOSeuTokenJWT2026
    VITE_API_URL=http://localhost:8080
    ```

3.  **Inicialização via Docker Compose:**
    Execute o comando para realizar o build das imagens e subir os serviços:
    ```bash
    docker compose up --build -d
    ```

4.  **Acesso:**
    * **Frontend:** `http://localhost:5173`
    * **Backend API:** `http://localhost:8080`
    * **Backend Swagger:** `http://localhost:8080/swagger-ui/index.html`

## Login

Para fazer login ou obter o token da API e acessar as rotas protegidas (Checkout e Histórico), utilize as credenciais:
* **Usuário:** `admin`
* **Senha:** `123456`

Este usuário está hardcoded no backend, pois não há tabela de usuários/roles.

## Melhorias Futuras

Caso houvesse maior tempo de desenvolvimento, as seguintes melhorias poderiam ser feitas:


* Implementar HTTPS.
* Não salvar o JWT no localStorage do frontend, usar cookie seguro (HttpOnly).
* Usar useMemo e useCallback no React para evitar re-renders desnecessários.
* Adicionar cache para não buscar os produtos na Fake Store a todo momento.
* Evitar buscar todos os produtos no frontend só para exibir o carrinho; a Fake Store tem 20 produtos, mas se fossem mais de 100 seria muito ruim para performance.
* Migrations do Banco de Dados
* Usuários e Roles
