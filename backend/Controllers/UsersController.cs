using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using ApplicationManager.Data;
using ApplicationManager.Models;
using System.Security.Cryptography;
using System.Text;

namespace ApplicationManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class UsersController : ControllerBase
    {
        private readonly SqlHelper _db;

        public UsersController(SqlHelper db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var dt = _db.ExecuteDataTable("sp_GetUsers");
            return Ok(dt);
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] UserModel model)
        {
            var hash = HashPassword(model.Password);
            try
            {
                _db.ExecuteNonQuery("sp_AddUser",
                    new SqlParameter("@Name", model.Name),
                    new SqlParameter("@Email", model.Email),
                    new SqlParameter("@PasswordHash", hash),
                    new SqlParameter("@Role", model.Role)
                );
            }
            catch (SqlException ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok("UserCreated");
        }

        private string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }
    }
}
