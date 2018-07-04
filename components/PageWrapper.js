import React from 'react';
import { apiUrl } from '../config.js';

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const headerMenuRes = await fetch(
        `${apiUrl}/wp-json/menus/v2/menus/header-menu`
      );
      const headerMenu = await headerMenuRes.json();
      return {
        headerMenu,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null)
      };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;
