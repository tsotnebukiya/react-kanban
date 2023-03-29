export type ButtonEvent =
  | React.MouseEvent<HTMLButtonElement>
  | React.KeyboardEvent<HTMLButtonElement>;

export interface ButtonProps {
  children: React.ReactNode;
  type: 'submit' | 'button';
  disabled?: boolean;
  className: string;
  onClick?: (event: ButtonEvent) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  let className = ``;
  if (props.className === 'dropdownside') {
    className = 'ml-auto';
  }
  if (props.className === 'close') {
    className = `py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 
    sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 
    dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600`;
  }
  if (props.className === 'blue') {
    className = `disabled:cursor-not-allowed h w-full text-white bg-primary-600 enabled:hover:bg-primary-700 
    enabled:focus:ring-4 enabled:focus:outline-none enabled:focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 
    text-center dark:bg-primary-600 dark:enabled:hover:bg-primary-700 dark:enabled:focus:ring-primary-800`;
  }
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={className}
    >
      {props.children}
    </button>
  );
};

export default Button;
