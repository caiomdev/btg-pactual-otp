# BTG Pactual OTP Auth API

API REST desenvolvida para o desafio técnico, responsável por gerar e validar tokens OTP, seguindo os princípios da **Arquitetura Limpa** com **AdonisJS** e **TypeScript**.

---

## 📌 Funcionalidades

- 🔐 Geração de tokens OTP
- ✅ Validação de tokens OTP

---

## 🚀 Tecnologias

- [AdonisJS](https://adonisjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org/)
- [Docker e Docker Compose](https://docs.docker.com/)

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/caiomdev/btg-pactual-otp
cd btg-pactual-otp
```

### 2. Configure as variáveis de ambiente
Crie um arquivo `.env` na raíz do projeto de acordo com as seguintes instruções:
```
PORT=3333              # Variável padrão do AdonisJS para configurar a porta onde a API irá escutar as requisições
HOST=0.0.0.0           # Variável padrão do AdonisJS para configurar o host da aplicação
LOG_LEVEL=info         # Variável padrão do AdonisJS para funcionamento dos logs
APP_KEY=CHAVE_SECRETA  # Variável padrão do AdonisJS e utilizada para gerar o OTP (Deve ser gerada através do comando node ace generate:key)
NODE_ENV=development   # Variável padrão do AdonisJS para definir ambiente de desenvolvimento

# Configuração do tempo de expiração do OTP
OTP_EXPIRATION=300      # Tempo de expiração do OTP (em segundos)

# Configurações do banco de dados
DB_HOST=btg-pactual-otp-db   # Host do banco de dados (fixo como nome do container no Docker)
DB_PORT=5432                 # Porta padrão do postgres
DB_USER=root                 # Usuário do banco de dados
DB_PASSWORD=root             # Senha do banco de dados
DB_DATABASE=otp_db           # Nome do banco de dados
```
> ⚠️ **Importante**:  
> O valor de `DB_HOST` deve **permanecer fixo** como `btg-pactual-otp-db`, pois este é o nome do container do banco definido no `docker-compose.yml`.

### 3. Criando a variável APP_KEY
Antes de executar o projeto, precisamos gerar a variável APP_KEY que é utilizada pelo AdonisJS como chave secreta, e utilizamos para gerar nosso OTP. Vamos instalar as dependências e gerar a chave:
```shell
npm install && node ace generate:key
```

### 4. Executando o projeto
O projeto está preparado para rodar com o docker compose, então após ter criado o arquivo .env como mencionado acima, execute o comando:
```
docker-compose up --build -d
```
Esse comando irá gerar a build do projeto, inciar o container com o banco de dados PostgreSQL com as credenciais e nome definidos nas variáveis de ambiente e por último irá rodar a aplicação e expor na porta que foi definida em PORT.

## 📮 Como utilizar a API

### Gerar OTP
**Endpoint:** `POST /api/otp`

Cria um token OTP para o email informado. Se já existir um token válido para o email, retorna o token existente.

#### Request

- Content-Type: `application/json`

- Body:

```json
{
  "email": "email@exemplo.com"
}
```

#### Response
- Status: `201`
- Body
```json
{
  "code": "1A2B3C"
}
```

### Validar OTP
**Endpoint:** `POST /api/otp/validate`

Valida se o token OTP informando juntamento ao e-mail é válido. Se o token for válido ele informa que foi válido e invalida na sequência.

#### Request

- Content-Type: `application/json`

- Body:

```json
{
  "email": "email@exemplo.com",
  "code": "1A2B3C",
}
```

#### Response
- Status: `200`
- Body
```json
{
  "message": "Token validated"
}
```

Se o token já tiver expirado, ele retorna uma mensagem de erro.
#### Response
- Status: `401`
- Body
```json
{
  "message": "Token has expired"
}
```