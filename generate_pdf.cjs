const fs = require('fs');

function generatePdf(outputPath) {
  // Simple PDF generator in pure Node.js
  const lines = [
    { text: "PHISHGUARD - MINI PROJECT REPORT", size: 14, bold: true, align: "center", yOffset: 750 },
    { text: "TABLE OF CONTENTS", size: 16, bold: true, align: "center", yOffset: 710 },
    { text: "SL No.                                                                                               Page No", size: 11, bold: true, yOffset: 665 },
    { text: "_______________________________________________________________________________", size: 10, yOffset: 658 },
    
    { text: "            ABSTRACT .......................................................................................... I", size: 11, bold: true, yOffset: 635 },
    
    { text: "1.        INTRODUCTION ................................................................................ 1", size: 11, bold: true, yOffset: 605 },
    { text: "            1.1 Overview .................................................................................... 1", size: 10, yOffset: 588 },
    { text: "            1.2 Problem Statement & Objectives ........................................... 1", size: 10, yOffset: 571 },
    
    { text: "2.        THEORY .............................................................................................. 2", size: 11, bold: true, yOffset: 541 },
    { text: "            2.1 Phishing Attack Vectors & Quishing ....................................... 2", size: 10, yOffset: 524 },
    { text: "            2.2 Heuristic Detection vs Blacklisting ...................................... 4", size: 10, yOffset: 507 },
    
    { text: "3.        SYSTEM DESIGN ............................................................................... 7", size: 11, bold: true, yOffset: 477 },
    { text: "            3.1 System Architecture ............................................................... 7", size: 10, yOffset: 460 },
    { text: "            3.2 Heuristic Rules & Weight Matrix .......................................... 8", size: 10, yOffset: 443 },
    
    { text: "4.        IMPLEMENTATION ............................................................................ 9", size: 11, bold: true, yOffset: 413 },
    { text: "            4.1 Backend Engine (Flask & MongoDB) ..................................... 9", size: 10, yOffset: 396 },
    { text: "            4.2 Frontend Dashboard (React) ................................................. 10", size: 10, yOffset: 379 },
    { text: "            4.3 QR Code & Bulk Scanner Modules ....................................... 11", size: 10, yOffset: 362 },
    
    { text: "5.        RESULTS .......................................................................................... 12", size: 11, bold: true, yOffset: 332 },
    { text: "            5.1 Test Cases & Detection Verdicts ......................................... 12", size: 10, yOffset: 315 },
    { text: "            5.2 Dual-Engine Performance Analysis ....................................... 16", size: 10, yOffset: 298 },
    
    { text: "6.        ADVANTAGES ................................................................................... 21", size: 11, bold: true, yOffset: 268 },
    { text: "7.        LIMITATIONS ................................................................................... 22", size: 11, bold: true, yOffset: 245 },
    { text: "8.        FUTURE SCOPE ................................................................................ 23", size: 11, bold: true, yOffset: 222 },
    { text: "9.        CONCLUSION .................................................................................... 24", size: 11, bold: true, yOffset: 199 },
    { text: "10.      REFERENCES .................................................................................... 25", size: 11, bold: true, yOffset: 176 },
    { text: "11.      PROJECT REPOSITORY .................................................................... 26", size: 11, bold: true, yOffset: 153 },
    
    { text: "_______________________________________________________________________________", size: 10, yOffset: 125 },
    { text: "PhishGuard: Intelligent Phishing URL Detection and Risk Analysis System | VTU 7th Sem INS", size: 9, align: "center", yOffset: 108 }
  ];

  let stream = "BT\n";
  for (const item of lines) {
    const font = item.bold ? "/F2" : "/F1";
    let x = 60;
    if (item.align === "center") {
      // Rough center on 595 width page
      x = 297 - (item.text.length * (item.size * 0.26));
    }
    stream += `${font} ${item.size} Tf\n`;
    stream += `${x.toFixed(2)} ${item.yOffset.toFixed(2)} Td\n`;
    stream += `(${item.text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")}) Tj\n`;
    stream += `${(-x).toFixed(2)} ${(-item.yOffset).toFixed(2)} Td\n`;
  }
  stream += "ET\n";

  const streamLength = Buffer.byteLength(stream, "utf-8");

  const objects = [];
  objects.push(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);
  objects.push(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`);
  objects.push(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n`);
  objects.push(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}endstream\nendobj\n`);
  objects.push(`5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>\nendobj\n`);
  objects.push(`6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>\nendobj\n`);

  let header = "%PDF-1.4\n";
  let body = "";
  const xrefOffsets = [0];

  let currentOffset = Buffer.byteLength(header, "utf-8");
  for (const obj of objects) {
    xrefOffsets.push(currentOffset);
    body += obj;
    currentOffset += Buffer.byteLength(obj, "utf-8");
  }

  const xrefStart = currentOffset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    xref += String(xrefOffsets[i]).padStart(10, '0') + " 00000 n \n";
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  const finalPdf = Buffer.concat([
    Buffer.from(header, "utf-8"),
    Buffer.from(body, "utf-8"),
    Buffer.from(xref, "utf-8"),
    Buffer.from(trailer, "utf-8")
  ]);

  fs.writeFileSync(outputPath, finalPdf);
  console.log("PDF created successfully at: " + outputPath);
}

generatePdf("C:/PhishGuard/PhishGuard_Table_of_Contents.pdf");
