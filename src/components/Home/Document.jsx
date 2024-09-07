import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Document.css';

function Document() {
  const location = useLocation();
  const { items = [], subtotal = 0 } = location.state || {};

  const generatePDF = () => {
    const input = document.getElementById('invoice');
    
    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p', // 'p' for portrait, 'l' for landscape
        unit: 'mm',
        format: [canvas.width * 0.75, canvas.height * 0.75] // A4 size can be used here
      });

      // Convert canvas to PDF
      const imgWidth = 398; // A4 width in mm
      const pageHeight = 282; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('quotation.pdf');
    });
  };

  useEffect(() => {
    generatePDF();
  }, []);

  return (
    <div id="invoice">
      <h1>quotation</h1>
      <table>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Order Summary</h2>
      <p><strong>ราคารวมทั้งหมด:</strong> ${subtotal}</p>
    </div>
  );
}

export default Document;
