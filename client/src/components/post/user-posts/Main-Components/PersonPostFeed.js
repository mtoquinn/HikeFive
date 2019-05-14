import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonPostItem from './PersonPostItem';

class PostFeed extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => <PersonPostItem handle={this.props.handle} key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
