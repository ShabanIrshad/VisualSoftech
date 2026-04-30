import React, { useEffect, useState } from "react";
import styles from "./VoucherList.module.css";
import { useNavigate } from "react-router-dom";



const VoucherList = () => {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");

  const confirmDelete = () => {
  const updated = vouchers.filter((_, i) => i !== deleteIndex);

  setVouchers(updated);
  localStorage.setItem("vouchers", JSON.stringify(updated));

  setDeleteIndex(null);
  alert("Deleted successfully ✅");
};

  // Simulate role (later connect with context)
  const userRole = localStorage.getItem("role") || "admin";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vouchers")) || [];
    setVouchers(stored);
    setFiltered(stored);
  }, []);

  // Filter logic
  useEffect(() => {
    let data = [...vouchers];

    if (typeFilter) {
      data = data.filter((v) => v.type === typeFilter);
    }

    if (search) {
      data = data.filter((v) =>
        v.narration.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [typeFilter, search, vouchers]);
  const handleLogout = () => {
  localStorage.removeItem("role");
  window.location.href = "/";
};

  const handleDelete = (index) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    const updated = vouchers.filter((_, i) => i !== index);
    setVouchers(updated);
    localStorage.setItem("vouchers", JSON.stringify(updated));
    alert("Deleted successfully");
  };

  return (
    <div className={styles.container}>
      <h2>Voucher List</h2>

      {/* Filters */}
      <div className={styles.filters}>
        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="Payment">Payment</option>
          <option value="Received">Received</option>
        </select>

        <input
          type="text"
          placeholder="Search Narration"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button onClick={handleLogout}>Logout</button>

      {/* Table */}
      <div className={styles.table}>
        <div className={styles.header}>
          <span>Date</span>
          <span>Type</span>
          <span>Narration</span>
          <span>Debit</span>
          <span>Credit</span>
          <span>Action</span>
        </div>

        {filtered.length === 0 ? (
          <p className={styles.noData}>No Data Found</p>
        ) : (
          filtered.map((v, index) => (
            <div key={index} className={styles.row}>
              <span>{v.date}</span>
              <span>{v.type}</span>
              <span>{v.narration}</span>
              <span>{v.type === "Payment" ? v.total : "-"}</span>
              <span>{v.type === "Received" ? v.total : "-"}</span>

              <div className={styles.actions}>
                {userRole === "admin" && (
                  <>
                    <button onClick={() => navigate(`/edit/${index}`)}>
  Edit
</button>
                   {userRole === "admin" && (
  <button onClick={() => setDeleteIndex(index)}>
    Delete
  </button>
)}
                  </>
                )}
              </div>
            </div>
          ))
        )}
         {deleteIndex !== null && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <p>Are you sure you want to delete?</p>
      <div className={styles.modalActions}>
        <button onClick={confirmDelete}>Yes</button>
        <button onClick={() => setDeleteIndex(null)}>Cancel</button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
   
  );
};

export default VoucherList;