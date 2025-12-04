import React, { useState, useEffect } from "react";
import "./styles.css";
import { debounce, throttle, applyPolyfill } from "./utils";

applyPolyfill();

export type Field = {
  name: string;
  label: string;
  validators?: ((v: any, allValues?: any) => string | null)[];
};

export default function FormValidator({
  fields,
  theme,
  onSubmit
}: {
  fields: Field[];
  theme?: { accent?: string; error?: string; border?: string };
  onSubmit: (values: any) => void;
}) {
  const [values, setValues] = useState({} as any);
  const [errors, setErrors] = useState({} as any);

  // apply theme
  useEffect(() => {
    if (theme?.accent) document.documentElement.style.setProperty("--accent", theme.accent);
    if (theme?.error) document.documentElement.style.setProperty("--error", theme.error);
    if (theme?.border) document.documentElement.style.setProperty("--border", theme.border);
  }, [theme]);

  const validate = debounce((name: string, value: any, allValues: any) => {
    const field = fields.find((f) => f.name === name);
    if (!field?.validators) return;

    for (const fn of field.validators) {
      const err = fn(value, allValues);
      if (err) return setErrors((e: any) => ({ ...e, [name]: err }));
    }

    setErrors((e: any) => ({ ...e, [name]: "" }));
  }, 250);

  const logInput = throttle((v) => console.log("throttle:", v), 500);

  function handleChange(name: string, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    validate(name, value, next);
    




    // If password changes, also validate confirmPassword if it exists
    if (name === "password" && next.confirmPassword) {
      validate("confirmPassword", next.confirmPassword, next);
    }
    
    logInput(next);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    






    // Validate all fields on submit
    const newErrors: any = {};
    let hasError = false;

    fields.forEach((field) => {
      const value = values[field.name];
      if (field.validators) {
        for (const validator of field.validators) {
          const error = validator(value, values);
          if (error) {
            newErrors[field.name] = error;
            hasError = true;
            return;
          }
        }
      }





      
      // If no error, clear it
      if (!newErrors[field.name]) {
        newErrors[field.name] = null;
      }
    });

    setErrors(newErrors);

    if (!hasError) {
      onSubmit(values);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((f) => (
        <div key={f.name}>
          <label>{f.label}</label>
          <input
            className="input"
            type={f.name.toLowerCase().includes("password") ? "password" : f.name === "email" ? "email" : f.name === "phone" ? "tel" : "text"}
            value={values[f.name] || ""}
            onChange={(e) => handleChange(f.name, e.target.value)}
            placeholder={`Enter ${f.label.toLowerCase()}`}
          />
          {errors[f.name] && <div className="error">{errors[f.name]}</div>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

