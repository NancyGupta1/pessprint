import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/category.css";
import { postData } from "../../Service/fetchnodeadminservices";

export default function Category() {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  // ---------- Error handling ----------
  const handleErrorMessages = (label, message) => {
    setErrorMessages((prev) => ({ ...prev, [label]: message }));
  };

  // ---------- Validation ----------
  const validateData = () => {
    let err = false;

    if (!categoryName.trim()) {
      handleErrorMessages("categoryName", "Please input category name");
      err = true;
    }

    return err;
  };

  // ---------- Reset ----------
  const resetValue = () => {
    setCategoryName("");
    setErrorMessages({});
  };

  // ---------- Submit (REAL API) ----------
  const handleSubmit = async () => {
    const err = validateData();
    if (err) return;

    setLoadingStatus(true);

    // slug generate
    const slug = categoryName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const body = {
      name: categoryName,
      slug: slug,
    };

    const result = await postData("products/add", body);

    setLoadingStatus(false);

    if (result?.data) {
      Swal.fire({
        icon: "success",
        title: "Product Created!",
        text: `Product "${categoryName}" has been created successfully`,
        confirmButtonText: "OK",
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

  // ---------- JSX ----------
  return (
    <div className="category-page">
      <div className="category-container">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <div className="category-header">
          <h1 className="category-title">Category Register</h1>
        </div>

        <form
          className="category-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-group">
            <label className="form-label">Category Name</label>

            <input
              type="text"
              className={`form-input ${errorMessages.categoryName ? "error" : ""
                }`}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              onFocus={() => handleErrorMessages("categoryName", null)}
              placeholder="Enter category name"
            />

            {errorMessages.categoryName && (
              <div className="error-message">
                {errorMessages.categoryName}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              className={`btn btn-primary ${loadingStatus ? "btn-loading" : ""
                }`}
              onClick={handleSubmit}
              disabled={loadingStatus}
            >
              {loadingStatus ? "Saving..." : "Save Category"}
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