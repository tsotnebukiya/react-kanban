import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DropDownIcon from './SVG/DropDown';
import Button, { ButtonEvent } from './UI/Button';

export interface MenuItemProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  path: string;
  dropdown?: { path: string; name: string }[];
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const css = `flex items-center p-2 text-base font-normal  text-gray-900 rounded-lg dark:text-white group`;
  const defaultClassName = css + ` hover:bg-gray-100 dark:hover:bg-gray-700`;
  const activeClassName = css + ` bg-gray-100 dark:bg-gray-700`;

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const dropdownClickHandler = (event: ButtonEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setDropDownOpen((prevState) => !prevState);
  };
  return (
    <li>
      <NavLink
        end
        to={props.path}
        className={({ isActive }) =>
          isActive ? activeClassName : defaultClassName
        }
      >
        {props.icon}
        <span className="ml-3">{props.children}</span>
        {props.dropdown && (
          <Button
            type="button"
            className="dropdownside"
            onClick={dropdownClickHandler}
          >
            <DropDownIcon />
          </Button>
        )}
      </NavLink>
      {props.dropdown && (
        <ul
          id="dropdown-pages"
          className={dropDownOpen ? 'py-2 space-y-2' : 'hidden'}
        >
          {props.dropdown &&
            props.dropdown.map((element) => {
              return (
                <li key={element.path}>
                  <NavLink
                    to={element.path}
                    className={({ isActive }) => {
                      if (isActive) {
                        return activeClassName + ' pl-11';
                      } else {
                        return defaultClassName + ' pl-11';
                      }
                    }}
                  >
                    {element.name}
                  </NavLink>
                </li>
              );
            })}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
