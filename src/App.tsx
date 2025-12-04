import { useState } from "react";
import { FormValidator } from "./validator";
import DemoPage from "./DemoPage";
import "./App.css";






const required = (msg: string) => (v: any) => (!v || !v.trim() ? msg : null);

const emailValidator = (v: string) => {
  if (!v) return "Email required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(v)) return "Please enter a valid email address";
  return null;
};

const phoneValidator = (v: string) => {
  if (!v) return "Phone required";
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(v) || v.replace(/\D/g, "").length < 10) {
    return "Please enter a valid phone number";
  }
  return null;
};

const minLength = (min: number, msg: string) => (v: string) => {
  if (!v || v.length < min) return msg;
  return null;
};

const passwordValidator = (v: string) => {
  if (!v) return "Password required";
  if (v.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(v)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(v)) return "Password must contain at least one lowercase letter";
  if (!/\d/.test(v)) return "Password must contain at least one number";
  return null;
};

export default function App() {
  const [showDemo, setShowDemo] = useState(false);

  const confirmPasswordValidator = (v: string, allValues?: any) => {
    if (!v) return "Please confirm your password";
    if (allValues && v !== allValues.password) return "Passwords do not match";
    return null;
  };

  return (
    <>
      <div className="app-container">
    <FormValidator
   fields={[
        { name: "name", label: "Full Name", validators: [required("Name is required"), minLength(3, "Name must be at least 3 characters")] },
        { name: "email", label: "Email Address", validators: [required("Email is required"), emailValidator] },
         { name: "phone", label: "Phone Number", validators: [required("Phone is required"), phoneValidator] },
       { name: "password", label: "Password", validators: [required("Password is required"), passwordValidator] },
            { name: "confirmPassword", label: "Confirm Password", validators: [required("Please confirm your password"), confirmPasswordValidator] },
  { name: "address", label: "Address", validators: [required("Address is required"), minLength(10, "Address must be at least 10 characters")] },
      { name: "city", label: "City", validators: [required("City is required")] },
       { name: "zipCode", label: "Zip Code", validators: [required("Zip code is required")] }
          ]}       
      theme={{ accent: "#3b82f6", error: "#e63946", border: "#e5e7eb" }}
     onSubmit={() => setShowDemo(true)}
        />
      </div>
      {showDemo && <DemoPage onClose={() => setShowDemo(false)} />}
    </>
  );
}
