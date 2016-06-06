/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import keyUrl from './key.svg';
import dotsUrl from './dots.svg';
import logoUrl from './logo.svg';

function Navigation({ className }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
      <Link className={cx(s.link, s.login)} to="/chat">Login<img src={keyUrl} className={s.icon} />Register</Link>
      <Link className={s.brand} to="/">
        <img src={logoUrl} alt="TEDxAmsterdam" />
      </Link>
      <Link className={cx(s.link, s.filter)} to=""><img src={dotsUrl} className={s.icon} />Filter Menu</Link>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(Navigation);
