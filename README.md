# Telemetry API 

Este projeto implementa uma API para ingestão e consulta de dados de telemetria de sensores, com isolamento multi-tenant. O objetivo é validar o núcleo de processamento de dados, desde a validação do dispositivo até o armazenamento e consulta das leituras.

---

## Lista de Tasks e Estimativa de Esforço (Backlog)

Abaixo está a lista de tasks criada após a leitura completa do escopo, considerando um ambiente SCRUM e foco em entrega incremental.

| Task                        | Descrição                                                        | Estimativa |
| --------------------------- | ---------------------------------------------------------------- | ---------- |
| Setup do projeto            | Inicialização do projeto Node.js com TypeScript e estrutura base | 1h         |
| Docker Compose              | Configuração do PostgreSQL via Docker Compose                    | 1h         |
| Configuração do Drizzle ORM | Setup do ORM, schemas e conexão com o banco                      | 1h         |
| Modelagem de dados          | Criação das tabelas `devices` e `sensor_readings`                | 0.5h       |
| Middleware de autenticação  | Simulação de usuário autenticado com tenantId                    | 0.5h       |
| Repository de Devices       | Implementação do acesso aos dispositivos                         | 0.5h       |
| Repository de Telemetria    | Implementação do acesso às leituras de sensores                  | 0.5h       |
| Use Case de ingestão        | Regra de negócio para validação e ingestão de telemetria         | 1h         |
| Endpoints da API            | Implementação dos endpoints POST e GET                           | 1h         |
| Isolamento multi-tenant     | Garantia de acesso restrito por tenant                           | 0.5h       |
| Testes de integração        | Testes validando isolamento entre tenants                        | 1h         |
| README e ajustes finais     | Documentação e revisão geral                                     | 0.5h       |

**Estimativa total:** ~10 horas

---

## Tecnologias utilizadas

* Node.js **24.11.0 ou superior**
* TypeScript
* Express
* PostgreSQL
* Drizzle ORM
* Docker / Docker Compose
* Jest e Supertest

---

## Estrutura do projeto

O projeto foi organizado com separação clara de responsabilidades:

* **Controllers**: Camada HTTP (rotas e validações)
* **Use Cases**: Regras de negócio
* **Repositories**: Acesso a dados
* **Factories**: Criação e injeção de dependências (Factory Pattern)
* **Middleware**: Simulação de autenticação e tenant
* **Tests**: Testes de integração

---

## Pré-requisitos

* Docker
* Docker Compose
* Node.js 24.11.0 ou superior

---

## Instalando o Node.js com nvm

Recomenda-se o uso do **nvm (Node Version Manager)** para gerenciar a versão do Node.js.

### 1. Instalar o nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Após a instalação, reinicie o terminal ou execute:

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

### 1. Subir o banco de dados

```bash
docker-compose up -d
```

---

### 2. Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/telemetry
```

---

### 3. Instalar dependências e rodar a aplicação

```bash
npm install
npm run dev
```

A API ficará disponível em:

```
http://localhost:3000
```

---

## Endpoints

### POST `/telemetry`

Registra uma leitura de sensor.

**Body:**

```json
{
  "deviceId": "device-id",
  "value": 25.5
}
```

* Valida se o dispositivo pertence ao tenant do usuário autenticado
* Salva a leitura no banco de dados

---

### GET `/telemetry/:deviceId`

Retorna as últimas 10 leituras do sensor informado.

* Acesso restrito ao tenant do usuário
* Dispositivos de outros tenants não podem ser acessados

---

## Testes

Os testes são de integração e validam principalmente o isolamento entre tenants.

### Variáveis de ambiente para testes

Crie um arquivo `.env.test` na raiz do projeto:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/telemetry
```

### Executar os testes

```bash
npm test
```

---

## Considerações finais

O foco da implementação foi entregar uma solução funcional, clara e segura, priorizando isolamento multi-tenant, tipagem forte e organização de código, conforme solicitado no escopo do teste.

---
