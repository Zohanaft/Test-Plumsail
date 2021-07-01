import React from 'react';
import MaterialIcon, { colorPalette } from 'material-icons-react';

export const HeaderNavbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper container">
      <a href="/" className="brand-logo">
        Test tusk
      </a>
      <ul className="right hide-on-med-and-down">
        <li>
          <a className="btn-floating btn-small waves-effect waves-light red">
            <MaterialIcon
              icon="add"
              color={colorPalette.amber._50}
              size="small"
            />
          </a>
        </li>
      </ul>
    </div>
  </nav>
);
