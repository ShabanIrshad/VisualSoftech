import React, { useEffect, useState } from "react";
import VoucherForm from "../components/voucher/VoucherForm";
import { useNavigate, useParams } from "react-router-dom";

const EditVoucher = () => {
  const [voucher, setVoucher] = useState(null);
  const { index } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      alert("Access denied");
      navigate("/");
      return;
    }

    const data = JSON.parse(localStorage.getItem("vouchers")) || [];
    setVoucher(data[index]);
  }, [index, role, navigate]);

  const handleUpdate = (updatedVoucher) => {
    const data = JSON.parse(localStorage.getItem("vouchers")) || [];

    data[index] = updatedVoucher;

    localStorage.setItem("vouchers", JSON.stringify(data));

    alert("Updated successfully ✅");
    navigate("/vouchers");
  };

  if (!voucher) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Voucher</h2>
      <VoucherForm
        initialData={voucher}
        isEdit={true}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default EditVoucher;