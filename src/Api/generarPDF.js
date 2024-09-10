import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const doc = new PDFDocument();
  const filePath = path.join(process.cwd(), "public", "estado-contable.pdf");

  // Crear un stream para guardar el PDF
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Añadir contenido al PDF
  doc.fontSize(25).text("Estado Contable", 100, 100);

  doc.text("Balance General", 100, 150);
  doc.text("Activo: $1000", 100, 200);
  doc.text("Pasivo: $500", 100, 250);
  doc.text("Capital: $500", 100, 300);

  // Finalizar el PDF
  doc.end();

  stream.on("finish", () => {
    res.status(200).json({ url: "/estado-contable.pdf" });
  });
}
