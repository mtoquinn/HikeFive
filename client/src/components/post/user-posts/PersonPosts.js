import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PersonPostForm from './Sub-Components/PersonPostForm';
import PersonPostFeed from './Main-Components/PersonPostFeed';
import Spinner from '../../common/Spinner';
import { getPersonalPosts } from '../../../actions/postActions';

class PersonPosts extends Component {
  componentDidMount() {
    this.props.getPersonalPosts(this.props.match.params.handle);
  }

  render() {
    const { posts, loading } = this.props.post;
    const handle = this.props.match.params.handle;

    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PersonPostFeed handle={handle} posts={posts} />;
    }

    return (
      <div className="personfeed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PersonPostForm handle={handle} />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PersonPosts.propTypes = {
  getPersonalPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPersonalPosts })(PersonPosts);
