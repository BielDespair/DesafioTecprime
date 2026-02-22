# 🚀 Tecprime Store - Fullstack Challenge



Este projeto é uma plataforma de e-commerce completa desenvolvida para o desafio técnico da Tecprime. A aplicação permite a navegação em um catálogo de produtos, gerenciamento de carrinho, autenticação via JWT e acompanhamento de pedidos em tempo real.

## 🏗️ Arquitetura do Sistema

A solução foi desenhada seguindo princípios de **Clean Architecture** e **Separation of Concerns**:

- **Backend (Spring Boot 21):** API RESTful com autenticação JWT, persistência em PostgreSQL e integração com APIs externas.
- **Frontend (React 18 + Vite):** Interface moderna e responsiva, utilizando Context API para estado global (Carrinho e Auth) e Service Layer para consumo de API.
- **Infraestrutura:** Orquestração completa via Docker Compose, utilizando Nginx como servidor de produção para os ativos estáticos do React.



---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 21 (LTS):** Utilizando novos recursos de produtividade e performance.
- **Spring Security + JWT:** Proteção de rotas e identidade do usuário.
- **Spring Data JPA:** Abstração de banco de dados e consultas otimizadas.
- **Maven:** Gestão de dependências e build lifecycle.

### Frontend
- **React + TypeScript:** Tipagem estática para maior segurança e previsibilidade.
- **Vite:** Ferramenta de build de última geração para performance superior.
- **Axios:** Cliente HTTP com interceptors para injeção automática de tokens.
- **CSS Modules/Global:** Estilização customizada sem dependências externas pesadas.

---

## 🚀 Como Rodar o Projeto

A forma mais simples e recomendada é através do **Docker**, que já configura todo o ambiente automaticamente.

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando.
- Git (opcional).

### Passo a Passo

1. **Clonar o Repositório**
   ```bash
   git clone [https://github.com/seu-usuario/desafio-tecprime.git](https://github.com/seu-usuario/desafio-tecprime.git)
   cd desafio-tecprime

# Oque fazer se tivesse mais tempo???


# Se fosse um projeto real 

Adicionar paginação de produtos no back e front

Implementar HTTPS

Não salvar o JWT token do front end no local storage, mas sim no cookie.

Implementar useMemo e useCallBack para evitar re-renders desnecessários do React.

Adicionar cache para evitar buscar os produtos na Fake Products toda hora

Não ficar buscando todos os produtos no front-end toda hora, para mostrar o carrinho. A fake store possui 20 produtos.
Se fosse maior que 100 isso seria horrível dp erfo

Nao buscar todos produtos e comparar id para exibir os itens dos pedidos.