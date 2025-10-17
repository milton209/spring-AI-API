# Spring AI API (Projeto Erudio)

Este é um projeto full-stack de estudo desenvolvido com base no conteúdo da [Erudio](https://erudio.com.br/). A aplicação explora o poder do framework **Spring AI** para criar um backend Java que serve uma API RESTful consumida por um frontend em **React**.

O projeto é dividido em um monorepo contendo:
* **Backend:** Uma API Spring Boot que se conecta a modelos de IA para chat, geração de receitas e criação de imagens.
* **Frontend:** Uma aplicação React (criada com `create-react-app`) que fornece uma interface de usuário para interagir com os serviços da API.

---

## ✨ Funcionalidades Implementadas

Baseado no código-fonte, o projeto oferece três funcionalidades principais:

1.  **Chat com IA (`TalkWithAI.js`)**
    * Permite ao usuário enviar um prompt de texto simples para a IA.
    * O backend (`ChatService.java`) recebe este prompt e utiliza o modelo `gpt-4o` com uma temperatura de `0.4` para gerar uma resposta de chat coesa.

2.  **Gerador de Receitas (`RecipeGenerator.js`)**
    * O usuário pode especificar ingredientes, um tipo de culinária e restrições dietéticas.
    * O backend (`RecipeService.java`) formata esses dados em um *prompt template* detalhado, solicitando à IA um título, lista de ingredientes e instruções de cozimento.
    * A resposta formatada em Markdown é renderizada no frontend usando a biblioteca `ReactMarkdown`.

3.  **Gerador de Imagens (`ImageGenerator.js`)**
    * Permite ao usuário enviar um prompt de texto para criar uma imagem.
    * O backend (`ImageService.java`) utiliza o `OpenAiImageModel` do Spring AI, permitindo a especificação de qualidade, número de imagens (`N`), altura e largura.
    * O frontend exibe as imagens geradas.

---

## 🛠️ Tecnologias Utilizadas

A pilha de tecnologia deste projeto foi identificada a partir dos arquivos de origem:

### Backend
* **Java** e **Spring Boot** (visto em `Sturtup.java`)
* **Spring AI:** Utilizado para a integração principal com a IA (visto em `ChatModel`, `OpenAiImageModel`, `PromptTemplate`).
* **Spring Web:** Para criar os controladores REST (implícito pelo `@Service` nos arquivos de serviço).
* **Maven (ou Gradle):** Gerenciador de dependências do Spring.

### Frontend
* **React.js** (visto pelo uso de `React, { useState }` e `ReactDOM.createRoot`)
* **JavaScript (ES6+)**
* **Node.js / npm:** Para gerenciamento de pacotes e ambiente de desenvolvimento.
* **CSS:** Para estilização básica (visto em `index.css`).
* **`react-markdown`:** Biblioteca para renderizar as receitas formatadas.
* **`api` (wrapper):** Um módulo de serviço (provavelmente Axios ou Fetch) para fazer chamadas `api.get` ao backend.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* **JDK 17+**
* **Node.js (LTS)**
* **Maven (ou Gradle)**
* **Chave de API da OpenAI:** Essencial para o Spring AI funcionar.

### 1. Configurar o Backend

1.  **Chave de API:** No backend (pasta `bakend/` ou `backend/`), navegue até `src/main/resources/` e configure seu arquivo `application.yml` (ou `application.properties`) com sua chave da OpenAI:
    ```yaml
    spring:
      ai:
        openai:
          api-key: 'SUA_CHAVE_DE_API_AQUI'
    ```
2.  **Iniciar o Backend:** Na raiz da pasta do backend, execute:
    ```bash
    # Se usar Maven
    ./mvnw spring-boot:run
    
    # Se usar Gradle
    ./gradlew bootRun
    ```
    O servidor da API estará rodando em `http://localhost:8080`.

### 2. Configurar o Frontend

1.  **Navegar para a pasta:** Abra um **novo terminal** e vá para a pasta do frontend (ex: `spring_AI_erudio_front-end/`):
    ```bash
    cd spring_AI_erudio_front-end
    ```
2.  **Instalar Dependências:**
    ```bash
    npm install
    ```
3.  **Iniciar o Frontend:**
    ```bash
    npm start
    ```
    A aplicação React abrirá automaticamente no seu navegador em `http://localhost:3000`.
