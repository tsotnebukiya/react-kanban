import { Fragment } from 'react';
import { createPortal } from 'react-dom';

export interface ModalLayoutProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalLayout: React.FC<ModalLayoutProps> = (props) => {
  return (
    <Fragment>
      <div
        className="fixed inset-0 bg-black opacity-50 z-49 modal"
        onClick={props.onClose}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-lg h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};

export default ModalLayout;
