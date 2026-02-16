using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using LoginSystem.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;

namespace LoginSystem.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly string _connectionString = @"Server=PEDRO;Database=SistemaLogin;Integrated Security=True;TrustServerCertificate=True;";
        private readonly string _jwtChave = "Sua_Chave_Super_Secreta_De_32_Caracteres!";

        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario login)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    string query = "SELECT Nome, Senha FROM Usuarios WHERE Email = @Email";
                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@Email", login.Email);
                    conn.Open();

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            // Corrigido: Usando 'as string' ou 'ToString()' com tratamento de nulo
                            string nome = reader["Nome"]?.ToString() ?? "Usuário";
                            string senhaHash = reader["Senha"]?.ToString() ?? "";

                            if (!string.IsNullOrEmpty(senhaHash) && BC.Verify(login.Senha, senhaHash))
                            {
                                var token = GerarToken(nome);
                                return Ok(new { nome, token });
                            }
                        }
                    }
                }
                return Unauthorized("E-mail ou senha inválidos.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro: {ex.Message}");
            }
        }

        [HttpPost("registrar")]
        public IActionResult Registrar([FromBody] Usuario novo)
        {
            try
            {
                string hash = BC.HashPassword(novo.Senha);
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    string query = "INSERT INTO Usuarios (Nome, Email, Senha) VALUES (@Nome, @Email, @Senha)";
                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@Nome", novo.Nome);
                    cmd.Parameters.AddWithValue("@Email", novo.Email);
                    cmd.Parameters.AddWithValue("@Senha", hash);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                return Ok("Usuário registrado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao registrar: {ex.Message}");
            }
        }

        // Corrigido: Parâmetro 'nome' agora aceita nulo ou tratamos antes de chamar
        private string GerarToken(string nome)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var chave = Encoding.ASCII.GetBytes(_jwtChave);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, nome)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(chave),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}