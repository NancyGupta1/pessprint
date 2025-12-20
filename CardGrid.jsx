import React from "react";
import TemplateCard from "./TemplateCard";
import styles from "../styles/CardGrid.module.css";

export default function CardGrid({ templates }) {
  return (
    <div className={styles.grid}>
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} />
      ))}
    </div>
  );
}
