<p align="center">
  <a href="https://www.prefeitura.sp.gov.br/cidade/secretarias/licenciamento/" target="blank"><img src="https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/chamadas/URBANISMO_E_LICENCIAMENTO_HORIZONTAL_FUNDO_CLARO_1665756993.png" width="200" alt="SMUL Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Base de desenvolvimento Backend - SMUL/ATIC</p>

## Descrição

Base de desenvolvimento backend de SMUL/ATIC:

- NESTJS: https://docs.nestjs.com/
- PRISMAIO: https://www.prisma.io/docs/getting-started

## Instalação

```bash
npm install
```


## Criando o arquivo .env

```bash
copy example.env .env
```

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o código gerado para o campo JWT_SECRET no arquivo .env

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o código gerado para o campo RT_SECRET no arquivo .env

## Configurando o banco de dados

No arquivo 'prisma/seed.ts' substitua as informações por suas informações de usuário. E então execute:

```bash
npx prisma migrate dev
```

```bash
npx prisma generate --schema=prisma2/schema.prisma
```

```bash
npx prisma db seed
```

## Rodando a aplicação

Por padrão, a aplicação rodará na porta 3000.

```bash
# atualiza a cada mudança nos arquivos
npm run dev
```
```bash
# modo de desenvolvimento
npm run start
```
```bash
# modo de produção
npm run prod
```
