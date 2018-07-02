import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import { Config } from '../config.js';

const linkStyle = {
  marginRight: 15
};

class Menu extends Component {
  constructor() {
    super();
  }

  getSlug(url) {
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : '';
  }

  render() {
    const { categories } = this.props;

    const menuItems = categories.map(item => {
      const slug = this.getSlug(item.link);

      return (
        <Link href={'category/' + slug} key={item.id}>
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
