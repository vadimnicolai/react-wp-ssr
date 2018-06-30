import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";
import { log } from "util";

class Post extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;

        console.log('context.query', context.query);
        
        const res = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/${apiRoute}?slug=${slug}`
        );
        const post = await res.json();

        console.log('post', post);

        return { post };
    }

    render() {
        if (!this.props.post.title) return <Error statusCode={404} />;

        return (
            <Layout>
                <Menu menu={this.props.headerMenu} />
                <h1>{this.props.post.title.rendered}</h1>
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
