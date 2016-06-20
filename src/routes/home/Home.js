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
import HomeStyles from './Home.css';
import tedxUrl from './tedx.svg';
import Link from '../../components/Link';

const title = 'TEDDYxAmsterdam';


function Home(test, context) {
  context.setTitle(title);
  return (
    <div className={HomeStyles.root}>
      <div className={HomeStyles.container}>
        <header className={HomeStyles.header}>
          <h1 className={HomeStyles.title}><b>#</b><img className={HomeStyles.brand} src={tedxUrl} />Ams</h1>
          <span className={HomeStyles.year}>2016</span>
        </header>

        <section className={HomeStyles.power}>
          <span className={HomeStyles.small}>new</span>
          <span className={HomeStyles.big}>POWER</span>
        </section>

        <Link className={cx(HomeStyles.link, HomeStyles.button)} to="/chat">
          <h2 className={HomeStyles.text}>Do you want to join us this year?</h2>
          <span className={HomeStyles.text}>Click here to register for your ticket!!!</span>
        </Link>
      </div>
    </div>
  );
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(HomeStyles)(Home);
