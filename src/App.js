import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Addorder1 from "./components/Home/Admin/Addorder1.jsx";
import Addorder2 from "./components/Home/Admin/Addorder2.jsx";
import Addorder3 from "./components/Home/Admin/Addorder3.jsx";
import Addorder4 from "./components/Home/Admin/Addorder4.jsx";
import Addusers from "./components/Home/Admin/Addusers.jsx";
import Admin from "./components/Home/Admin/Admin.jsx";
import EditProduct from "./components/Home/Admin/EditProduct.jsx";
import Editusers from "./components/Home/Admin/Editusers.jsx";
import Order2Edit from "./components/Home/Admin/Order2Edit.jsx";
import Order3Edit from "./components/Home/Admin/Order3Edit.jsx";
import OrderEdit from "./components/Home/Admin/orderEdit.jsx";
import TonEdit from "./components/Home/Admin/TonEdit.jsx";
import Checkslip from "./components/Home/Checkslip.jsx";
import Delivery from "./components/Home/Delivery.jsx";
import Document from "./components/Home/Document.jsx";
import Home from "./components/Home/Home.jsx";
import Makepayment from "./components/Home/Makepayment.jsx";
import Order from "./components/Home/Order.jsx";
import ShoppingCart from "./components/Home/Shoppingcart.jsx";
import ShowQRCode from "./components/Home/ShowQRCode .jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Bottom from "./components/Home/bottommm.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/editusers/:id" element={<Editusers />} />
          <Route path="/addusers" element={<Addusers />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/orderedit/:id" element={<OrderEdit />} />
          <Route path="/order2edit/:id" element={<Order2Edit />} />
          <Route path="/order3edit/:id" element={<Order3Edit />} />
          <Route path="/addorder1" element={<Addorder1 />} />
          <Route path="/addorder2" element={<Addorder2 />} />
          <Route path="/addorder3" element={<Addorder3 />} />
          <Route path="/addorder4" element={<Addorder4 />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="/showQRCode" element={<ShowQRCode />} />
          <Route path="/checkslip" element={<Checkslip />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/document" element={<Document />} />
          <Route path="/bottomm" element={<Bottom />} />
          <Route path="/tonedit/:id" element={<TonEdit />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
