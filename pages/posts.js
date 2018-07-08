import Layout from '../components/Layout.js';
import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PageWrapper from '../components/PageWrapper.js';
import Menu from '../components/Menu.js';
import FeaturedMedia from '../components/Post/FeaturedMedia';
import Gallery from '../components/Post/Format/Gallery';
import { apiUrl } from '../config.js';

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;

    const res = await fetch(`${apiUrl}/wp-json/wp/v2/${apiRoute}?slug=${slug}`);
    const [post] = await res.json();

    const categoriesRes = await fetch(`${apiUrl}/wp-json/wp/v2/categories`);
    const categories = await categoriesRes.json();

    return { post, categories };
  }

  render() {
    if (!this.props.post.title && !this.props.post.content) return null;

    const {
      post: { acf, featured_media: featuredMedia }
    } = this.props;

    const postFormat = () => {
      switch (acf.postFormat) {
        case 'gallery': {
          return <Gallery {...acf} />;
        }
        default:
          return 'state';
      }
    };

    return (
      <Layout>
        <Menu categories={this.props.categories} />
        <h1>{this.props.post.title.rendered}</h1>
        {featuredMedia ? (
          <FeaturedMedia url={apiUrl} id={featuredMedia} />
        ) : null}
        {postFormat()}
      </Layout>
    );
  }
}

export default PageWrapper(Post);
