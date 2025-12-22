import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/category.css";
import { postData } from "../../Service/fetchnodeadminservices";

export default function DesignReg() {
  const navigate = useNavigate();

  const [designName, setDesignName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  /* ---------------- ERROR HANDLING ---------------- */
  const handleErrorMessages = (label, message) => {
    setErrorMessages((prev) => ({ ...prev, [label]: message }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validateData = () => {
    let err = false;

    if (!designName.trim()) {
      handleErrorMessages("designName", "Please input design name");
      err = true;
    }

    if (subCategories.length === 0) {
      handleErrorMessages("subCategories", "Add at least one subcategory");
      err = true;
    }

    return err;
  };

  /* ---------------- ADD SUBCATEGORY ON ENTER ---------------- */
  const handleSubCategoryKeyDown = (e) => {
    if (e.key === "Enter" && subCategory.trim()) {
      e.preventDefault();

      setSubCategories((prev) => [...prev, subCategory.trim()]);
      setSubCategory("");
      handleErrorMessages("subCategories", null);
    }
  };

  /* ---------------- REMOVE SUBCATEGORY ---------------- */
  const removeSubCategory = (index) => {
    setSubCategories((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------- RESET ---------------- */
  const resetValue = () => {
    setDesignName("");
    setSubCategory("");
    setSubCategories([]);
    setErrorMessages({});
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const err = validateData();
    if (err) return;

    setLoadingStatus(true);

    const body = {
      name: designName,
      subCategories: subCategories,
    };

    const result = await postData("design/add", body);
    setLoadingStatus(false);

    if (result?.data) {
      Swal.fire({
        icon: "success",
        title: "Design Created!",
        text: `Design "${designName}" has been created successfully`,
      });
      resetValue();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result?.message || "Something went wrong",
      });
    }
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="category-page">
      <div className="category-container">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <div className="category-header">
          <h1 className="category-title">Design Register</h1>
        </div>

        <form className="category-form" onSubmit={(e) => e.preventDefault()}>
          {/* DESIGN NAME */}
          <div className="form-group">
            <label className="form-label">Design Name</label>
            <input
              type="text"
              className={`form-input ${errorMessages.designName ? "error" : ""
                }`}
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              onFocus={() => handleErrorMessages("designName", null)}
              placeholder="Enter design name"
            />
            {errorMessages.designName && (
              <div className="error-message">
                {errorMessages.designName}
              </div>
            )}
          </div>

          {/* SUBCATEGORY INPUT */}
          <div className="form-group">
            <label className="form-label">
              Subcategories (Press Enter to add)
            </label>
            <input
              type="text"
              className="form-input"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              onKeyDown={handleSubCategoryKeyDown}
              placeholder="Type subcategory and press Enter"
            />
            {errorMessages.subCategories && (
              <div className="error-message">
                {errorMessages.subCategories}
              </div>
            )}
          </div>

          {/* SUBCATEGORY LIST */}
          {subCategories.length > 0 && (
            <div className="subcategory-grid">
              {subCategories.map((item, index) => (
                <div key={index} className="subcategory-chip">
                  {item}
                  <span
                    className="remove-chip"
                    onClick={() => removeSubCategory(index)}
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ACTIONS */}
          <div className="form-actions">
            <button
              className={`btn btn-primary ${loadingStatus ? "btn-loading" : ""
                }`}
              onClick={handleSubmit}
              disabled={loadingStatus}
            >
              {loadingStatus ? "Saving..." : "Save Design"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetValue}
              disabled={loadingStatus}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
