import React, { useState } from "react";
import styles from "./VoucherForm.module.css";

const VoucherForm = ({ initialData, isEdit = false, onSave }) => {
  const [voucherType, setVoucherType] = useState(
  initialData?.type || "Payment"
);

const [narration, setNarration] = useState(
  initialData?.narration || "On Account"
);

const [rows, setRows] = useState(
  initialData?.rows || [
    {
      account: "",
      amount: "",
      tdsApplicable: "No",
      tdsType: "",
    },
  ]
);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  const handleSave = () => {
  const total = rows.reduce((sum, r) => sum + Number(r.amount || 0), 0);

  const voucherData = {
    date: initialData?.date || new Date().toLocaleDateString(),
    type: voucherType,
    narration,
    total,
    rows,
  };

  onSave(voucherData);
};

  // Add new row
  const addRow = () => {
    setRows([
      ...rows,
      { account: "", amount: "", tdsApplicable: "No", tdsType: "" },
    ]);
  };

  // Remove row
  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // Calculate total
  const totalAmount = rows.reduce((sum, row) => {
    return sum + Number(row.amount || 0);
  }, 0);

  return (
    <div className={styles.container}>
      <h2>Voucher Entry</h2>

      {/* Top Section */}
      <div className={styles.topSection}>
        <div>
          <label>Voucher Type</label>
          <select
            value={voucherType}
            onChange={(e) => setVoucherType(e.target.value)}
          >
            <option value="Payment">Payment</option>
            <option value="Received">Received</option>
          </select>
        </div>

        <div>
          <label>Narration</label>
          <input
            type="text"
            value={narration}
            onFocus={() => setNarration("")}
            onChange={(e) => setNarration(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className={styles.table}>
        <div className={styles.header}>
          <span>Account</span>
          <span>Amount</span>
          <span>TDS</span>
          <span>TDS Type</span>
          <span>Action</span>
        </div>

        {rows.map((row, index) => (
          <div key={index} className={styles.row}>
            <select
              value={row.account}
              onChange={(e) =>
                handleChange(index, "account", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
            </select>

            <input
              type="number"
              value={row.amount}
              onChange={(e) =>
                handleChange(index, "amount", e.target.value)
              }
            />

            <select
              value={row.tdsApplicable}
              onChange={(e) =>
                handleChange(index, "tdsApplicable", e.target.value)
              }
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>

            {row.tdsApplicable === "Yes" ? (
              <select
                value={row.tdsType}
                onChange={(e) =>
                  handleChange(index, "tdsType", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="TDS1">TDS1</option>
                <option value="TDS2">TDS2</option>
              </select>
            ) : (
              <span className={styles.na}>N/A</span>
            )}

            <div className={styles.actions}>
              <button onClick={addRow}>+</button>
              {rows.length > 1 && (
                <button onClick={() => removeRow(index)}>x</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className={styles.total}>
        {voucherType === "Payment" && (
          <p>Total DR Amount: {totalAmount}</p>
        )}
        {voucherType === "Received" && (
          <p>Total CR Amount: {totalAmount}</p>
        )}
      </div>

     <button onClick={handleSave} className={styles.saveBtn}>
  Save
</button>
    </div>
  );
};

export default VoucherForm;