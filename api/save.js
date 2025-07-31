import { sql } from '@vercel/postgres';   // or '@neondatabase/serverless'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    // 1. 寫入資料並取回 UUID
    const { rows } = await sql`
      INSERT INTO evaluations (payload)
      VALUES (${req.body})
      RETURNING id
    `;

    // 2. 將 UUID 回傳給前端
    return res.status(200).json({ ok: true, id: rows[0].id });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}



