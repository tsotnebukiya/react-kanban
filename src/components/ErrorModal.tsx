import ReactPortal from './ReactPortal';
import ModalLayout from '../layouts/ModalLayout';
import Button from './UI/Button';
export interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorHeader: string;
  errorText: string;
}

const ErrorModal: React.FC<ErrorModalProps> = (props) => {
  if (!props.isOpen) {
    return null;
  }
  return (
    <ReactPortal>
      <ModalLayout onClose={props.onClose}>
        <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
          <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            {props.errorHeader}
          </h3>
          <p>{props.errorText}</p>
        </div>
        <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
          <div className="space-y-4 sm:space-x-4 sm:space-y-0">
            <Button onClick={props.onClose} type="button" className="close">
              Close
            </Button>
          </div>
        </div>
      </ModalLayout>
    </ReactPortal>
  );
};

export default ErrorModal;
