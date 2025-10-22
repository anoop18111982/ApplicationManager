using System.Data;
using System.IO;
using OfficeOpenXml;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace ApplicationManager.Services
{
    public class ExportService
    {
        public byte[] ExportPdf(DataTable dt)
        {
            using var ms = new MemoryStream();
            var doc = new Document(PageSize.A4);
            PdfWriter.GetInstance(doc, ms);
            doc.Open();

            var table = new PdfPTable(dt.Columns.Count);
            foreach (DataColumn col in dt.Columns)
                table.AddCell(new Phrase(col.ColumnName));

            foreach (DataRow row in dt.Rows)
                foreach (var cell in row.ItemArray)
                    table.AddCell(new Phrase(cell?.ToString() ?? ""));

            doc.Add(table);
            doc.Close();
            return ms.ToArray();
        }

        public byte[] ExportExcel(DataTable dt)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage();
            var ws = package.Workbook.Worksheets.Add("Applications");
            ws.Cells["A1"].LoadFromDataTable(dt, true);
            return package.GetAsByteArray();
        }
    }
}
