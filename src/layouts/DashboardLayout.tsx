import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  return (
    <div className="relative w-full flex-1 md:overflow-hidden">
      navbarElement
      <div className="md:absolute md:inset-x-0 md:top-16 md:bottom-0">
        <div className="h-full py-8 px-6 scrollbar md:overflow-y-auto md:px-8">
          CONTENT
          <div className="h-96 rounded-xl border-4 border-dashed border-muted-1" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
