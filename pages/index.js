import Layout from '../components/Layout.js';
import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import PageWrapper from '../components/PageWrapper.js';
import Menu from '../components/Menu.js';
import FeaturedMedia from '../components/Post/FeaturedMedia';
import { Config: {apiUrl} } from '../config.js';

class Index extends Component {
  static async getInitialProps(context) {
    const pageRes = await fetch(
      `${apiUrl}/wp-json/postlight/v1/page?slug=welcome`
    );
    const page = await pageRes.json();
    const postsRes = await fetch(`${apiUrl}/wp-json/wp/v2/posts?_embed`);
    const posts = await postsRes.json();

    const categoriesRes = await fetch(
      `${apiUrl}/wp-json/wp/v2/categories`
    );
    const categories = await categoriesRes.json();
    return { page, posts, categories };
  }

  render() {
    const posts = this.props.posts.map((post, index) => {
      const { featured_media: featuredMedia } = post;
      const liStyle = {
        listStyle: 'none',
        link: {
          fontSize: '20px',
          textDecoration: 'none'
        }
      };

      return (
        <ul key={index} style={{ padding: '0' }}>
          <li style={liStyle}>
            <Link
              as={`/posts/${post.slug}`}
              href={`/posts?slug=${post.slug}&apiRoute=posts`}
            >
              <a style={liStyle.link}>
                {post.title.rendered}
                {featuredMedia ? (
                  <FeaturedMedia url={Config.apiUrl} id={featuredMedia} />
                ) : null}
              </a>
            </Link>
          </li>
        </ul>
      );
    });
    return (
      <Layout>
        <Menu categories={this.props.categories} />
        {posts}
      </Layout>
    );
  }
}

export default PageWrapper(Index);
