import React from "react";
import styles from "../styles/FilterBar.module.css";

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className={styles.filterBar}>
      <select
        onChange={(e) =>
          setFilters((f) => ({ ...f, deliverySpeed: e.target.value }))
        }
      >
        <option value="">All Delivery Speeds</option>
        <option value="Standard">Standard</option>
        <option value="Express">Express</option>
      </select>
    </div>
  );
}
