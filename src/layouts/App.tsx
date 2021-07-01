import React from 'react';

import { HeaderNavbar } from '@components/HeaderNavbar';
import { Footer } from '@components/Footer';

import { HomePage } from '@pages/HomePage';

import * as styles from 'src/assets/scss/main.scss';

export const App: React.FC = () => (
  <>
    <header>
      <HeaderNavbar />
    </header>
    <div className={styles.default.main}>
      <div className="container">
        <HomePage />
      </div>
    </div>
    <Footer />
  </>
);
