using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using ApplicationManager.Data;
using ApplicationManager.Services;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace ApplicationManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SqlHelper _db;
        private readonly JwtService _jwt;
        public AuthController(SqlHelper db, JwtService jwt)
        {
            _db = db; _jwt = jwt;
        }

        public class LoginDto { public string Email { get; set; } = ""; public string Password { get; set; } = ""; }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var dt = _db.ExecuteDataTable("sp_GetUserByEmail", new SqlParameter("@Email", dto.Email));
            if (dt.Rows.Count == 0) return Unauthorized("Invalid credentials");
            var row = dt.Rows[0];
            var hash = row["PasswordHash"].ToString();
            if (!VerifyHash(dto.Password, hash)) return Unauthorized("Invalid credentials");
            var role = row["Role"].ToString();
            var userId = int.Parse(row["UserId"].ToString());
            var token = _jwt.Generate(userId, dto.Email, role ?? "User");
            return Ok(new { token, role, email = dto.Email, displayName = row["Name"] });
        }

        private bool VerifyHash(string password, string hash)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            var b64 = Convert.ToBase64String(bytes);
            return b64 == hash;
        }
    }
}
