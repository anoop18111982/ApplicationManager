using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace ApplicationManager.Data
{
    public class SqlHelper
    {
        private readonly string _connectionString;
        private readonly IConfiguration _config;
        public SqlHelper(IConfiguration config)
        {
            _config = config;
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public DataTable ExecuteDataTable(string spName, params SqlParameter[] parameters)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            if (parameters != null && parameters.Length > 0) cmd.Parameters.AddRange(parameters);
            var da = new SqlDataAdapter(cmd);
            var dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        public void ExecuteNonQuery(string spName, params SqlParameter[] parameters)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            if (parameters != null && parameters.Length > 0) cmd.Parameters.AddRange(parameters);
            conn.Open();
            cmd.ExecuteNonQuery();
        }
    }
}
