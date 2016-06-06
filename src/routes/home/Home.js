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
import s from './Home.css';
import tedxUrl from './tedx.svg';
import Link from '../../components/Link';

const title = 'TEDDYxAmsterdam';

function Home({ news }, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <header className={s.header}>
          <h1 className={s.title}><b>#</b><img className={s.brand} src={tedxUrl} />Ams</h1>
          <span className={s.year}>2016</span>
        </header>

        <section className={s.power}>
          <span className={s.small}>new</span>
          <span className={s.big}>POWER</span>
        </section>

        <Link className={cx(s.link, s.button)} to="/chat">
          <h2 className={s.text}>Do you want to join us this year?</h2>
          <span className={s.text}>Click here to register for your ticket!!!</span>
        </Link>
      </div>
    </div>
  );
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
