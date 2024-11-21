// pages/api/export.js
import { Parser } from 'json2csv';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const books = req.body;

    try {
      const parser = new Parser();
      const csv = parser.parse(books);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=books.csv');
      res.status(200).send(csv);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate CSV' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
