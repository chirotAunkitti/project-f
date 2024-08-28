import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Checkslip.css';
import { saveOrderToDatabase } from "../../Database/Api/AdminApi";

function Checkslip() {
  const [slipOkData, setSlipOkData] = useState([]);
  const [files, setFiles] = useState("");
  const navigate = useNavigate();

  const handleFile = (e) => {
    setFiles(e.target.files[0]);
  }

  console.log("Select files: ", files);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("files", files);
  try {
    const res = await fetch("https://api.slipok.com/api/line/apikey/28222", {
      method: "POST",
      headers: {
        "x-authorization": "SLIPOK6154TNY"
      },
      body: formData
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    console.log("Request successful");
    const data = await res.json();
    setSlipOkData(data.data);
    console.log("Slipok data: ", data);
    
    if (data.data?.success === true) {
      // Save order data to database
      const orderData = {
        items: [
          // Add a dummy item
          { id: 1, quantity: 1, price: parseFloat(data.data.amount) || 0 }
        ],
        totalAmount: parseFloat(data.data.amount) || 0,
        slipData: {
          slipImageUrl: URL.createObjectURL(files),
          receiverName: data.data.receiver?.displayName || '',
          sendingBank: data.data.sendingBank || '',
          transDate: data.data.transDate || '',
          transTime: data.data.transTime || ''
        }
      };

      console.log("Order data to be saved:", orderData);

      try {
        const savedData = await saveOrderToDatabase(orderData);
        console.log("Saved order data:", savedData);
        toast.success('สลิปโอนเงินถูกต้องและบันทึกข้อมูลเรียบร้อย', {
          icon: <FontAwesomeIcon icon={faCheckCircle} />
        });
        // นำทางไปยังหน้า /delivery หลังจาก 5 วินาที
        setTimeout(() => {
          navigate('/delivery');
        }, 5000);
      } catch (error) {
        console.error("Error saving order to database:", error);
        toast.error(`เกิดข้อผิดพลาดในการบันทึกข้อมูล: ${error.message}`, {
          icon: <FontAwesomeIcon icon={faTimesCircle} />
        });
      }
    } else {
      console.warn("Slip validation failed:", data);
      toast.error('สลิปโอนเงินไม่ถูกต้อง', {
        icon: <FontAwesomeIcon icon={faTimesCircle} />
      });
    }
  } catch (error) {
    console.error("Error during fetching or processing data: ", error);
    toast.error(`เกิดข้อผิดพลาดในการตรวจสอบ: ${error.message}`, {
      icon: <FontAwesomeIcon icon={faTimesCircle} />
    });
  }
};

  return (
    <div className="checkslip-wrapper">
      <ToastContainer position="top-center" autoClose={3000} />
      <h3 className="checkslip-heading">แนบสลิปโอนเงิน ของท่าน</h3>
      <form onSubmit={handleSubmit} className="checkslip-form">
        <div className="checkslip-file-input-wrapper">
          <input className="checkslip-file-input" type="file" accept='image/*' onChange={handleFile} />
          <button className="checkslip-submit-button" type='submit'>ตรวจสอบสลิป</button>
        </div>
        {files && <img src={URL.createObjectURL(files)} alt="slip" className="checkslip-slip-image" />}
        <hr />
         <p>ผู้รับโอนเงิน: {slipOkData?.receiver?.displayName}</p>  
        {/* <p>ธนาคารผู้รับเงิน: {slipOkData?.receivingBank === "002" ? "ธนาคารกรุงเทพ" : null}</p> */}
         <p>ธนาคารผู้โอนเงิน: {slipOkData?.sendingBank === "004" ? "ธนาคารกสิกร" : null}</p>  
         {/* <p>ธนาคารผู้โอนเงิน: {slipOkData?.sendingBank === "002" ? "ธนาคารกรุงเทพ" : null}</p> 
        <p>ธนาคารผู้โอนเงิน: {slipOkData?.sendingBank === "006" ? "ธนาคารกรุงไทย" : null}</p>
         <p>ธนาคารผู้โอนเงิน: {slipOkData?.sendingBank === "011" ? "ธนาคารทหารไทยธนชาต" : null}</p> 
         <p>ธนาคารผู้โอนเงิน: {slipOkData?.sendingBank === "014" ? "ธนาคารไทยพาณิชย์" : null}</p> 
        <p>ธนาคารผู้โอนเงิน: {slipOkData?.sendingBank === "025" ? "ธนาคารกรุงศรีอยุธยา" : null}</p> 
         <p>ธนาคารผู้โอนเงิน: {slipOkData?.sendingBank === "030" ? "ธนาคารออมสิน" : null}</p> */}
    
        <div className="checkslip-info-box">
          <p><span className="checkslip-info-label">วันที่โอนเงิน:</span> <span className="checkslip-info-value">{slipOkData?.transDate}</span></p>
          <p><span className="checkslip-info-label">เวลาที่โอนเงิน:</span> <span className="checkslip-info-value">{slipOkData?.transTime}</span></p>
          <p><span className="checkslip-info-label">จำนวนเงิน:</span> <span className="checkslip-info-value">{slipOkData?.amount}</span></p>
        </div>
      </form>
    </div>
  );
}

export default Checkslip;

