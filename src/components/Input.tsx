import { forwardRef, ForwardRefRenderFunction, Fragment } from 'react';

export interface InputProps {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  return (
    <Fragment>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        required={props.required}
        placeholder={props.placeholder}
        ref={ref}
        className='className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
      />
    </Fragment>
  );
};

export default forwardRef(Input);
