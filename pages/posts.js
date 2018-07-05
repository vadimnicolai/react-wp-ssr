import Layout from '../components/Layout.js';
import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PageWrapper from '../components/PageWrapper.js';
import Menu from '../components/Menu.js';
import FeaturedMedia from '../components/Post/FeaturedMedia';
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
    if (!this.props.post.title) return <Error statusCode={404} />;
    const {
      post: { featured_media: featuredMedia }
    } = this.props;

    return (
      <Layout>
        <Menu categories={this.props.categories} />
        <h1>{this.props.post.title.rendered}</h1>
        {featuredMedia ? (
          <FeaturedMedia url={apiUrl} id={featuredMedia} />
        ) : null}
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.post.content.rendered
          }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Post);
