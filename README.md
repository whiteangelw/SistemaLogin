
🛡️ FullStack Auth System - JWT & BCrypt
  Sistema de autenticação robusto e moderno, focado em segurança e experiência do usuário (UX). O projeto utiliza uma arquitetura desacoplada com um Backend em ASP.NET Web API e um Frontend responsivo em JS.

🚀 Funcionalidades
  Autenticação JWT (JSON Web Token): Sessões seguras e stateless.

  Segurança de Dados: Hash de senhas utilizando o algoritmo BCrypt.

  Gestão de Usuários: Fluxos completos de Login, Registro e Recuperação de Senha.

  Interface Moderna (UI/UX):

  Dark/Light Mode: Persistente via LocalStorage.

  Glassmorphism: Interface baseada em transparências e desfoque.

  Loading States: Feedback visual em botões durante chamadas de API.

  Regras de Negócio: Validação rigorosa de complexidade de senha (min. 6 caracteres + letra maiúscula).

🔒 Segurança Implementada
  *Prevenção de SQL Injection: Uso de parâmetros (SqlParameter) em todas as consultas.

  *Criptografia Unidirecional: Senhas nunca são armazenadas em texto puro.

  *Tratamento de Nulos: Implementação de Nullable Reference Types do C# para evitar exceções em tempo de execução.

🛠️ Tecnologias Utilizadas
  Backend
  ASP.NET Core Web API 8

  Microsoft.Data.SqlClient: Comunicação direta e performática com SQL Server.

  BCrypt.Net-Next: Criptografia de alta segurança para senhas.

  System.IdentityModel.Tokens.Jwt: Geração e validação de tokens.

  Frontend
  HTML5 & CSS3: Variáveis CSS e animações Keyframes.

  JavaScript: Manipulação de DOM e Fetch API para comunicação assíncrona.

  FontAwesome: Biblioteca de ícones.

  Banco de Dados
  SQL Server: Armazenamento relacional de usuários.

🏗️ Arquitetura do Sistema

  graph LR
    A[Frontend JS] -- Fetch/JSON --> B[ASP.NET Web API]
    B -- ADO.NET --> C[SQL Server]
    C -- Data --> B
    B -- JWT Token --> A


📋 Como rodar o projeto

  1. Configuração do Banco de Dados
  No SQL Server Management Studio (SSMS), execute:

  CREATE DATABASE SistemaLogin;
  GO
  USE SistemaLogin;
  CREATE TABLE Usuarios (
      Id INT PRIMARY KEY IDENTITY,
      Nome VARCHAR(100) NOT NULL,
      Email VARCHAR(100) UNIQUE NOT NULL,
      Senha VARCHAR(MAX) NOT NULL
  );

  2. Configuração do Backend
  *Abra a solução no Visual Studio.

  *Verifique a ConnectionString no arquivo AuthController.cs.

  *Instale os pacotes NuGet: Microsoft.Data.SqlClient, BCrypt.Net-Next e Microsoft.AspNetCore.Authentication.JwtBearer.

  *Execute o projeto (F5).

  3. Configuração do Frontend
  *Verifique se a variável API_URL no arquivo script.js corresponde à porta que o seu backend está rodando (ex: https://localhost:0000).

  *Abra o arquivo index.html em seu navegador.



