import React from "react";
import VoucherForm from "../components/voucher/VoucherForm";

const CreateVoucher = () => {

  const handleSave = (voucherData) => {
    const existing = JSON.parse(localStorage.getItem("vouchers")) || [];
    const updated = [...existing, voucherData];

    localStorage.setItem("vouchers", JSON.stringify(updated));

    alert("Saved successfully ✅");
  };

  return (
    <div>
      <h2>Create Voucher</h2>
      <VoucherForm onSave={handleSave} />
    </div>
  );
};

export default CreateVoucher;