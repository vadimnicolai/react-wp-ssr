import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import Link from 'next/link';
import { Config } from '../config.js';

const linkStyle = {
  marginRight: 15,
  color: 'black',
  fontSize: '22px',
  fontFamily:
    '-apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  textDecoration: 'none'
};

class Menu extends Component {
  constructor() {
    super();
  }

  getSlug(url) {
    const [, slug] = url.split('/').reverse();

    return slug;
  }

  render() {
    const { categories } = this.props;

    const menuItems = categories.map(item => {
      const slug = this.getSlug(item.link);

      return (
        <Link href={{ pathname: '/category/' + slug }} key={item.id}>
          <a style={linkStyle}>{item.name}</a>
        </Link>
      );
    });

    return (
      <Fragment>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        {menuItems}
      </Fragment>
    );
  }
}

export default Menu;
