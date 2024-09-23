import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { useLocation } from "react-router-dom";
import "./Document.css";
import Content from "./content";
import Funtion from "./decorate/Funtion";

function Document() {
  const location = useLocation();
  const { items = [], subtotal = 0 } = location.state || {};

  const generatePDF = () => {
    const input = document.getElementById("invoice");

    html2canvas(input, { scrollY: -window.scrollY, useCORS: true }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: "a4",
        });

        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("quotation.pdf");
      }
    );
  };

  return (
    <div>
      <div id="invoice"> 
        <h1 className="receipt">ใบเสร็จรับเงิน/ใบกำกับภาษี</h1>
        <h4 className="receipt_">Receipt/Tax Invoice</h4>
        <div className="invoices">
          <img src="/image/logo/Screenshot 2024-09-18 144112.png" alt="" />
          <p></p>
        </div>
        <div>
          <p className="invoices">หมู่ที่ 4 No reviews 396/6 Setthakij 1 Rd</p>
          <p className="invoices">Tambon Tha Mai, Amphoe Krathum Baen</p>
          <p className="invoices">Chang Wat Samut Sakhon 74110 หมู่ที่ 4</p>
          <p className="invoices">กระทุ่มแบน สมุทรสาคร</p>
        </div>
        <div className="xxxx">
          <div className="_xxxx">
            <p>เลขทะเบียน: 0745566010982</p>
            <p>เบอร์โทร: 123-xxx-xxxx</p>
            <p>รหัสลูกค้า: 742xxxxxxxxxxx</p>
          </div>
        </div>
        <div>
          <p></p>
          <Content />
        </div>
        <div className="row">
          <div className="column-left">
            <p>ได้รับเงินจาก (Received From) :</p>
            <p>ที่อยู่ (Address) :</p>
            <p>เลขประจำตัวผู้เสียภาษี (Tax ID) :</p>
          </div>
          <div className="column-left">
            <p>บริษัท ธนชาตประกันภัย จำกัด (มหาชน)</p>
            <p>40 ม.20 ต.ป่าเมือง อ.เมือง จ.เชียงใหม่ 50100</p>
            <p>0105565037793 สำนักงานใหญ่</p>
          </div>
          <div className="column-left">
            <p>หน้า (Page) : 1/1</p>
            <p>วันที่ (Date) : 01/05/2024</p>
            <p>เลขที่ (No.) : 13240500039</p>
          </div>
        </div>
        <table className="table_Document">
          <thead>
            <tr>
              <th className="table_xx">PRODUCT</th>
              <th className="table_xx">PRICE</th>
              <th className="table_xx">QUANTITY</th>
              <th className="table_xx">TOTAL</th>
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
        {/* <div>
        <Funtion />
        </div> */}
        <div className="receipt_H">
          <div className="receipt_N">
            <p>หมายเหตุ:</p>
          </div>
          <div className="receipt_N order-summary">
            <h4>Order Summary</h4>
            <div className="summary-item">
              <strong>ราคารวมทั้งหมด:</strong>
              <span>${subtotal}</span>
            </div>
          </div>
        </div>
      <div className="Accepted">
        <div className="payment-info">
          <p className="payment-header">การชำระเงิน/Payment</p>
          <div className="payment-details">
            <div className="payment-item">
              <p className="payment-label">ธนาคาร</p>
              <p className="payment-value"></p>
            </div>
            <div className="payment-item">
              <p className="payment-label">ชื่อบัญชี</p>
              <p className="payment-value"></p>
            </div>
            <div className="payment-item">
              <p className="payment-label">เลขที่บัญชี</p>
              <p className="payment-value"></p>
            </div>
          </div>
        </div>
        <div className="payment-detailss">
          <div className="payment-itemm">
            <p className="payment-labell">อนุมัติ/Approved by</p>
            <p className="payment-valuee"></p>
          </div>
          <div className="payment-itemm">
            <p className="payment-labell">ยอมรับใบเสนอราคา/Accepted</p>
            <p className="payment-valuee"></p>
          </div>
        </div>
      </div>
      </div>
      <div className="Button_PDF">
        <button_ onClick={generatePDF}>Download PDF</button_>
      </div>
    </div>
  );
}

export default Document;
