USE SistemaLogin;
GO
-- Insira um usuário de teste para validar
INSERT INTO Usuarios (Email, Senha, Nome) 
VALUES ('teste@email.com', '123456', 'Desenvolvedor Master');
GO
-- Verifique se ele apareceu
SELECT * FROM Usuarios;
