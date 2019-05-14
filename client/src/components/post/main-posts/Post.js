import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from './Main-Components/PostItem';
import CommentForm from './Main-Components/CommentForm';
import CommentFeed from './Sub-Components/CommentFeed';
import Spinner from '../../common/Spinner';
import { getPost } from '../../../actions/postActions';

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    if (this.props.location.state) {
      if (this.props.location.state.reload === 0) {
        window.location.reload();
        this.props.history.push({
          pathname: `/post/${this.props.match.params.id}`,
          state: { reload: 1 }
        });
      }
    }
  }

  render() {
    const { post, loading } = this.props.post;

    let postContent;
    
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {

      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentFeed postId={post._id} comments={post.comments} />
          <CommentForm postId={post._id} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="fb-comments"
                data-href={this.props.url}
                data-width="100%"
                data-numposts="10"
                data-order-by="reverse_time">
              </div>
              <Link to="/feed" className="btn btn-dark mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
