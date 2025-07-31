import { sql }   from "@vercel/postgres";
import ExcelJS   from "exceljs";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ ok: false, error: "id required" });

  // 1. 取資料
  const { rows } = await sql`
    SELECT payload, created_at FROM evaluations WHERE id = ${id} LIMIT 1
  `;
  if (!rows.length) return res.status(404).json({ ok: false, error: "not found" });
  const payload = rows[0].payload;

  // 2. 建立工作簿
  const wb  = new ExcelJS.Workbook();
  const ws1 = wb.addWorksheet("基本資料");
  const ws2 = wb.addWorksheet("場站明細");

  // A. 基本資料（把 stations 以外全部展平）
  const basic = { ...payload };
  delete basic.stations;
  ws1.columns = Object.keys(basic).map(key => ({ header: key, key }));
  ws1.addRow(basic);

  // B. 場站
  ws2.columns = [
    { header: "name",   key: "name"   },
    { header: "area",   key: "area"   },
    { header: "spaces", key: "spaces" }
  ];
  (payload.stations || []).forEach(st => ws2.addRow(st));

  // 3. 輸出
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="evaluation_${id}.xlsx"`
  );
  await wb.xlsx.write(res);
  res.end();
}
