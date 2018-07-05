import React, { Component } from 'react';

const img = {
  display: 'block',
  paddingTop: '15px'
};

class FeaturedMedia extends Component {
  constructor() {
    super();
    this.state = {
      sourceUrl: null
    };
  }
  async componentWillMount() {
    const { id, url } = this.props;
    const res = await fetch(`${url}/wp-json/wp/v2/media/${id}`);
    const {
      media_details: {
        sizes: {
          medium: { source_url: sourceUrl }
        }
      }
    } = await res.json();

    this.setState({ sourceUrl });
  }

  render() {
    return this.state && this.state.sourceUrl ? (
      <img style={img} src={this.state.sourceUrl} />
    ) : null;
  }
}

export default FeaturedMedia;
