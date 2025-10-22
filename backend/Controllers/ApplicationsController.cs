using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using ApplicationManager.Data;
using ApplicationManager.Services;
using ApplicationManager.Models;

namespace ApplicationManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ApplicationsController : ControllerBase
    {
        private readonly SqlHelper _db;
        private readonly ExportService _export;

        public ApplicationsController(SqlHelper db, ExportService export)
        {
            _db = db;
            _export = export;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var dt = _db.ExecuteDataTable("sp_GetApplications");
            return Ok(dt);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Add([FromBody] ApplicationModel model)
        {
            _db.ExecuteNonQuery("sp_AddApplication",
                new SqlParameter("@ApplicationName", model.ApplicationName),
                new SqlParameter("@ApplicationUrl", model.ApplicationUrl ?? ""),
                new SqlParameter("@HostedOn", string.Join(',', model.HostedOn)),
                new SqlParameter("@APIServer", model.APIServer ?? ""),
                new SqlParameter("@DBServer", model.DBServer ?? ""),
                new SqlParameter("@ApplicationOwner", model.ApplicationOwner ?? ""),
                new SqlParameter("@Status", model.Status ?? "Active")
            );
            return Ok("Added");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(int id, [FromBody] ApplicationModel model)
        {
            _db.ExecuteNonQuery("sp_UpdateApplication",
                new SqlParameter("@AppId", id),
                new SqlParameter("@ApplicationName", model.ApplicationName),
                new SqlParameter("@ApplicationUrl", model.ApplicationUrl ?? ""),
                new SqlParameter("@HostedOn", string.Join(',', model.HostedOn)),
                new SqlParameter("@APIServer", model.APIServer ?? ""),
                new SqlParameter("@DBServer", model.DBServer ?? ""),
                new SqlParameter("@ApplicationOwner", model.ApplicationOwner ?? ""),
                new SqlParameter("@Status", model.Status ?? "Active")
            );
            return Ok("Updated");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult SoftDelete(int id)
        {
            _db.ExecuteNonQuery("sp_SoftDeleteApplication", new SqlParameter("@AppId", id));
            return Ok("SoftDeleted");
        }

        [HttpGet("deleted")]
        [Authorize(Roles = "Admin")]
        public IActionResult Deleted()
        {
            var dt = _db.ExecuteDataTable("sp_GetDeletedApplications");
            return Ok(dt);
        }

        [HttpPost("restore/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Restore(int id)
        {
            _db.ExecuteNonQuery("sp_RestoreApplication", new SqlParameter("@AppId", id));
            return Ok("Restored");
        }

        [HttpDelete("hard/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult HardDelete(int id)
        {
            _db.ExecuteNonQuery("sp_HardDeleteApplication", new SqlParameter("@AppId", id));
            return Ok("HardDeleted");
        }

        [HttpGet("export/{type}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Export(string type)
        {
            var dt = _db.ExecuteDataTable("sp_GetApplications");
            if (type == "pdf")
                return File(_export.ExportPdf(dt), "application/pdf", "Applications.pdf");
            else
                return File(_export.ExportExcel(dt), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Applications.xlsx");
        }
    }
}
