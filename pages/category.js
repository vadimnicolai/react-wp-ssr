import Layout from '../components/Layout.js';
import React, { Component } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PageWrapper from '../components/PageWrapper.js';
import Menu from '../components/Menu.js';
import { apiUrl } from '../config.js';
import { log } from 'util';

class Category extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const categoriesRes = await fetch(
      `${apiUrl}/wp-json/wp/v2/categories?slug=${slug}`
    );
    const categories = await categoriesRes.json();
    const allCategoriesRes = await fetch(`${apiUrl}/wp-json/wp/v2/categories`);
    const allCategories = await allCategoriesRes.json();

    if (categories.length > 0) {
      const postsRes = await fetch(
        `${apiUrl}/wp-json/wp/v2/posts?categories=${categories[0].id}`
      );
      const posts = await postsRes.json();
      return { categories, posts, allCategories };
    }

    return { categories, allCategories };
  }
  render() {
    if (this.props.categories.length == 0) return <Error statusCode={404} />;

    const posts = this.props.posts.map((post, index) => {
      return (
        <ul key={index}>
          <li>
            <Link
              as={`/posts/${post.slug}`}
              href={`/posts?slug=${post.slug}&apiRoute=posts`}
            >
              <a>{post.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });
    return (
      <Layout>
        <Menu categories={this.props.allCategories} />
        <h1>{this.props.categories[0].name} Posts</h1>
        {posts}
      </Layout>
    );
  }
}

export default PageWrapper(Category);
