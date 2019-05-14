import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PersonPostItem from './Main-Components/PersonPostItem';
import PersonCommentForm from './Main-Components/PersonCommentForm';
import PersonCommentFeed from './Main-Components/PersonCommentFeed';
import Spinner from '../../common/Spinner';
import { getPersonalPost } from '../../../actions/postActions';
import { withRouter } from 'react-router-dom';

class PersonPost extends Component {
  componentDidMount() {
    this.props.getPersonalPost(this.props.match.params.id);
    if (this.props.location.state) {
      if (this.props.location.state.reload === 0) {
        window.location.reload();
        this.props.history.push({
          pathname: `/post/${this.props.match.params.handle}/${this.props.match.params.id}`,
          state: { reload: 1 }
        });
      }
    }
  }

  render() {
    const { post } = this.props.post;

    let postContent;

    if (post === null || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PersonPostItem post={post} showActions={false} />
          <PersonCommentFeed postId={post._id} comments={post.comments} />
          <PersonCommentForm postId={post._id} />
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
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PersonPost.propTypes = {
  getPersonalPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPersonalPost })(withRouter(PersonPost));
