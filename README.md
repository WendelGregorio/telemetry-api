# Telemetry API – Teste Técnico

Este projeto implementa uma API para ingestão e consulta de dados de telemetria de sensores, com isolamento multi-tenant.
O objetivo é validar o núcleo de processamento de dados, desde a validação do dispositivo até o armazenamento e consulta das leituras.

---

## Tecnologias utilizadas

* **Node.js 24.11.0 ou superior**
* TypeScript
* Express
* PostgreSQL
* Drizzle ORM
* Docker / Docker Compose
* Jest + Supertest (testes de integração)

---

## Estrutura do projeto

O código está organizado com separação clara de responsabilidades:

* **Controllers**: Camada HTTP (rotas e validação de entrada)
* **Use Cases**: Regras de negócio
* **Repositories**: Acesso a dados
* **Factories**: Criação e injeção de dependências
* **Middleware**: Simulação de autenticação e contexto de tenant
* **Tests**: Testes de integração focados no isolamento entre tenants

---

## Pré-requisitos

* Docker
* Docker Compose
* **Node.js 24.11.0 ou superior**

---

## Instalando a versão correta do Node.js (via nvm)

Recomenda-se o uso do **nvm (Node Version Manager)** para gerenciar a versão do Node.js.

### 1. Instalar o nvm

Caso ainda não tenha o nvm instalado:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Após a instalação, reinicie o terminal ou carregue o nvm:

```bash
source ~/.nvm/nvm.sh
```

---

### 2. Instalar e usar o Node.js 24.11.0

```bash
nvm install 24.11.0
nvm use 24.11.0
```

Verifique a versão:

```bash
node -v
```

---

## Subindo o ambiente

### 1. Subir os containers

Na raiz do projeto, execute:

```bash
docker-compose up -d
```

Isso irá subir:

* PostgreSQL (metadados e telemetria)
* Infraestrutura necessária para a aplicação

---

### 2. Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/telemetry
```

> O arquivo `.env` não é versionado e deve ser criado localmente.

---

### 3. Instalar dependências e rodar a aplicação

```bash
npm install
npm run dev
```

A API estará disponível em:
`http://localhost:3000`

---

## Endpoints disponíveis

### POST `/telemetry`

Registra uma leitura de sensor.

**Body:**

```json
{
  "deviceId": "device-id",
  "value": 25.5
}
```

* O tenant do usuário é simulado via middleware
* O dispositivo é validado antes do registro da leitura

---

### GET `/telemetry/:deviceId`

Retorna as **últimas 10 leituras** do sensor informado.

* O acesso é restrito ao tenant do usuário autenticado
* Dispositivos de outros tenants não podem ser acessados

---

## Executando os testes

Os testes de integração validam principalmente o isolamento entre tenants.

### 1. Criar o arquivo `.env.test`

Na raiz do projeto:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/telemetry
```

### 2. Executar os testes

```bash
npm test
```

---

## Observações finais

* O projeto prioriza clareza, tipagem forte e separação de responsabilidades
* O isolamento multi-tenant é garantido tanto na camada de negócio quanto nos testes
* O uso de Docker permite rodar o ambiente de forma previsível e reproduzível

---
