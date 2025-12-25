import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/category.css";
import { postData } from "../../Service/fetchnodeadminservices";

export default function DesignReg() {
  const navigate = useNavigate();

  const [designName, setDesignName] = useState("");
  const [customFields, setCustomFields] = useState([""]); // ✅ dynamic inputs
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

    const filledFields = customFields.filter((f) => f.trim() !== "");
    if (filledFields.length === 0) {
      handleErrorMessages("customFields", "Add at least one field");
      err = true;
    }

    return err;
  };

  /* ---------------- HANDLE FIELD CHANGE ---------------- */
  const handleFieldChange = (index, value) => {
    const updated = [...customFields];
    updated[index] = value;
    setCustomFields(updated);
    handleErrorMessages("customFields", null);
  };

  /* ---------------- ADD FIELD ---------------- */
  const addField = () => {
    setCustomFields((prev) => [...prev, ""]);
  };

  /* ---------------- REMOVE FIELD ---------------- */
  const removeField = (index) => {
    setCustomFields((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------- RESET ---------------- */
  const resetValue = () => {
    setDesignName("");
    setCustomFields([""]);
    setErrorMessages({});
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const err = validateData();
    if (err) return;

    setLoadingStatus(true);

    const body = {
      name: designName,
      customFields: customFields.filter((f) => f.trim() !== ""), // ✅ backend clean
    };

    const result = await postData("design/add", body);
    setLoadingStatus(false);

    if (result?.data) {
      Swal.fire({
        icon: "success",
        title: "Design Created!",
        text: `Design "${designName}" created successfully`,
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
              className={`form-input ${
                errorMessages.designName ? "error" : ""
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

          {/* CUSTOM INPUTS */}
          <div className="form-group">
            <label className="form-label">Custom Fields</label>

            {customFields.map((field, index) => (
              <div key={index} className="dynamic-input-row">
                <input
                  type="text"
                  className="form-input"
                  value={field}
                  placeholder={`Field ${index + 1}`}
                  onChange={(e) =>
                    handleFieldChange(index, e.target.value)
                  }
                />

                {customFields.length > 1 && (
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

            {errorMessages.customFields && (
              <div className="error-message">
                {errorMessages.customFields}
              </div>
            )}

            <button
              type="button"
              className="add-btn"
              onClick={addField}
            >
              + Add Field
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
