import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createWrapper } from '../utils/WrapperElement';

export interface ReactPortalProps {
  wrapperId?: string;
  children: React.ReactNode;
}

const ReactPortal: React.FC<ReactPortalProps> = (props) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );
  useLayoutEffect(() => {
    let element: HTMLElement;
    let systemCreated = false;
    if (props.wrapperId) {
      element = document.getElementById(props.wrapperId)!;
    } else {
      systemCreated = true;
      element = createWrapper('modal');
    }
    setWrapperElement(element);
    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [props.wrapperId]);
  if (wrapperElement === null) return null;
  return createPortal(props.children, wrapperElement);
};

export default ReactPortal;
