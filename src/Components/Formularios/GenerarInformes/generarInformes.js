import { useState } from "react";

export default function DownloadPDF() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePDF = async () => {
    const response = await fetch("/api/generate-pdf");
    const data = await response.json();
    setPdfUrl(data.url);
  };

  return (
    <div>
      <button onClick={generatePDF}>Generar PDF</button>
      {pdfUrl && (
        <a href={pdfUrl} download="estado-contable.pdf">
          Descargar PDF
        </a>
      )}
    </div>
  );
}
