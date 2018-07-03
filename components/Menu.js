import React, { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import _ from 'lodash';
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
    const [, slug] = url.split('/').reverse();

    return slug;
  }

  render() {
    const { categories } = this.props;
    const {
      router: { pathname }
    } = this.props;

    const menuItems = categories.map(item => {
      const slug = this.getSlug(item.link);
      const prefix = pathname == '/category' ? '' : 'category/';

      return (
        <Link href={prefix + slug} key={item.id}>
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

export default withRouter(Menu);
