import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface BaseFieldProps {
  label: string;
  icon?: LucideIcon;
  error?: string;
  required?: boolean;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
}

interface TextareaFieldProps extends BaseFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  type: 'textarea';
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  type: 'select';
  children: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export const FormField = (props: FormFieldProps) => {
  const { label, icon: Icon, error, required, className = "" } = props;

  const baseInputClasses = `w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:border-primary-400 focus:outline-none transition-colors ${
    Icon ? 'pl-12' : ''
  } ${error ? 'border-red-400' : ''}`;

  const renderField = () => {
    if (props.type === 'textarea') {
      const { type, ...textareaProps } = props;
      return (
        <textarea
          {...textareaProps}
          className={baseInputClasses}
          rows={props.rows || 4}
        />
      );
    }

    if (props.type === 'select') {
      return (
        <select
          value={props.value}
          onChange={props.onChange}
          className={baseInputClasses}
        >
          {props.children}
        </select>
      );
    }

    const { type = 'text', ...inputProps } = props;
    return (
      <input
        type={type}
        {...inputProps}
        className={baseInputClasses}
      />
    );
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        )}
        {renderField()}
      </div>
      
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};