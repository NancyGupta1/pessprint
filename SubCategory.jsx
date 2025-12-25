import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/category.css";
import { postData, getData } from "../../Service/fetchnodeadminservices";

export default function SubCategory() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const result = await getData("category/display");
    if (result?.data) {
      setCategories(result.data);
    }
  };

  /* ---------------- ERROR HANDLING ---------------- */
  const handleErrorMessages = (label, message) => {
    setErrorMessages((prev) => ({ ...prev, [label]: message }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validateData = () => {
    let err = false;

    if (!categoryId) {
      handleErrorMessages("categoryId", "Please select a category");
      err = true;
    }

    const filledSubs = subCategories.filter((s) => s.trim() !== "");
    if (filledSubs.length === 0) {
      handleErrorMessages("subCategories", "Add at least one subcategory");
      err = true;
    }

    return err;
  };

  /* ---------------- HANDLE INPUT CHANGE ---------------- */
  const handleChange = (index, value) => {
    const updated = [...subCategories];
    updated[index] = value;
    setSubCategories(updated);
    handleErrorMessages("subCategories", null);
  };

  /* ---------------- ADD INPUT ---------------- */
  const addField = () => {
    setSubCategories((prev) => [...prev, ""]);
  };

  /* ---------------- REMOVE INPUT ---------------- */
  const removeField = (index) => {
    setSubCategories((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------- RESET ---------------- */
  const resetValue = () => {
    setCategoryId("");
    setSubCategories([""]);
    setErrorMessages({});
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const err = validateData();
    if (err) return;

    setLoadingStatus(true);

    const body = {
      categoryId,
      subCategories: subCategories.filter((s) => s.trim() !== ""),
    };

    const result = await postData("subcategory/add", body);
    setLoadingStatus(false);

    if (result?.data) {
      Swal.fire({
        icon: "success",
        title: "SubCategories Added!",
        text: "SubCategories have been added successfully",
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
          <h1 className="category-title">SubCategory Register</h1>
        </div>

        <form className="category-form" onSubmit={(e) => e.preventDefault()}>
          {/* CATEGORY SELECT */}
          <div className="form-group">
            <label className="form-label">Select Category</label>
            <select
              className={`form-input ${
                errorMessages.categoryId ? "error" : ""
              }`}
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                handleErrorMessages("categoryId", null);
              }}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {errorMessages.categoryId && (
              <div className="error-message">
                {errorMessages.categoryId}
              </div>
            )}
          </div>

          {/* SUBCATEGORY INPUTS */}
          <div className="form-group">
            <label className="form-label">SubCategories</label>

            {subCategories.map((item, index) => (
              <div key={index} className="dynamic-input-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder={`SubCategory ${index + 1}`}
                  value={item}
                  onChange={(e) =>
                    handleChange(index, e.target.value)
                  }
                />

                {subCategories.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeField(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {errorMessages.subCategories && (
              <div className="error-message">
                {errorMessages.subCategories}
              </div>
            )}

            <button
              type="button"
              className="add-btn"
              onClick={addField}
            >
              + Add SubCategory
            </button>
          </div>

          {/* ACTIONS */}
          <div className="form-actions">
            <button
              className={`btn btn-primary ${
                loadingStatus ? "btn-loading" : ""
              }`}
              onClick={handleSubmit}
              disabled={loadingStatus}
            >
              {loadingStatus ? "Saving..." : "Save SubCategory"}
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
