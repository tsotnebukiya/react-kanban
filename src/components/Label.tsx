import { LabelHTMLAttributes } from 'react';

export interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = (props) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {props.children}
    </label>
  );
};

export default Label;
