import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PersonPostForm from '../../post/user-posts/Sub-Components/PersonPostForm';
import PersonPostFeed from '../../post/user-posts/Main-Components/PersonPostFeed';
import Spinner from '../../common/Spinner';
import { getPersonalPosts } from '../../../actions/postActions';

class ProfileFeed extends Component {
  componentDidMount() {
    this.props.getPersonalPosts(this.props.group);
  }

  render() {
    const { posts, loading } = this.props.post;
    const handle = this.props.group;

    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PersonPostFeed handle={handle} posts={posts} />;
    }

    return (
      <div className="groupFeed">
        <div className="row">
          <div className="col-md-12">
            <PersonPostForm handle={handle} />
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

ProfileFeed.propTypes = {
  getPersonalPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPersonalPosts })(ProfileFeed);
