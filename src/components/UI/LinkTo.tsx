import { Link } from 'react-router-dom';

export interface LinkToProps {
  children: React.ReactNode;
  to: string;
}

const LinkTo: React.FC<LinkToProps> = (props) => {
  return (
    <Link
      to={props.to}
      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
    >
      {props.children}
    </Link>
  );
};

export default LinkTo;
