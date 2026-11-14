import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  full?: boolean;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; required?: boolean }) => ReactNode;
};

/** Label, control, hint and error wired together for screen readers. */
export function Field({ id, label, required, error, hint, full, children }: FieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`field ${full ? "field--full" : ""}`}>
      <label htmlFor={id}>
        {label} {required ? <span className="req" aria-hidden="true">*</span> : <span className="opt">(optional)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy, required })}
      {hint && (
        <p id={`${id}-hint`} className="hint">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="error">
      <Icon name="close" size={14} /> {message}
    </p>
  );
}

type ChoiceGroupProps = {
  name: string;
  legend: string;
  type: "radio" | "checkbox";
  options: readonly string[];
  value: string | string[];
  onChange: (value: string) => void;
  error?: string;
};

export function ChoiceGroup({ name, legend, type, options, value, onChange, error }: ChoiceGroupProps) {
  const isChecked = (opt: string) => (Array.isArray(value) ? value.includes(opt) : value === opt);
  return (
    <fieldset className="field field--full" aria-describedby={error ? `${name}-error` : undefined}>
      <legend>
        {legend} <span className="req" aria-hidden="true">*</span>
      </legend>
      <div className="choices" aria-invalid={Boolean(error)}>
        {options.map((opt) => (
          <label key={opt} className="choice">
            <input type={type} name={name} value={opt} checked={isChecked(opt)} onChange={() => onChange(opt)} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}
