import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../../../actions/postActions';
import CommentWindow from '../Sub-Components/CommentWindow';
import CommentFeed from '../Sub-Components/CommentFeed';
import CommentWindowForm from '../Sub-Components/CommentWindowForm';
import { getPost } from '../../../../actions/postActions';
import defaultAvatar from '../../../../img/defaultAvatar.jpg';

class PostItem extends React.Component {
  constructor() {
    super();
    this.state = {
      showReply: false,
      updated: false
    }
    this.updateLikes = this.updateLikes.bind(this);
    this.findUserLike = this.findUserLike.bind(this);
  }

  updateLikes(id) {
    const { post } = this.props;
    if (this.findUserLike(post.likes)) {
      if (!this.state.updated) {
        post.likes.length = post.likes.length - 1;
        this.props.removeLike(id);
        this.setState(() => {
          return {
            updated: false
          };
        });
      } else {
        post.likes.length = post.likes.length + 1;
        this.props.addLike(id);
        this.setState(() => {
          return {
            updated: false
          };
        });
      }
    }
    else {
      if (!this.state.updated) {
        post.likes.length = post.likes.length + 1;
        this.props.addLike(id);
        this.setState(() => {
          return {
            updated: true
          };
        });
      } else {
        post.likes.length = post.likes.length - 1;
        this.props.removeLike(id);
        this.setState(() => {
          return {
            updated: false
          };
        });
      }
    }
  }

  onCommentsClick() {
    this.setState({ showReply: !this.state.showReply })
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    var moment = require('moment');
    var fomatted_date = moment(post.date).format('LLL');
    var short_date = moment(post.date).format('LT');
    var postAvatar;

    let commentsContent;

    if (post.comments.length <= 3) {
      commentsContent = <CommentFeed postId={post._id} comments={post.comments} />;
    } else {
      commentsContent = <CommentWindow postId={post._id} comments={post.comments} />;
    }

    if(post.avatar === ''){
      postAvatar = defaultAvatar;
    }else {
      postAvatar = post.avatar;
    }

    return (
      <div className="d-flex card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
          <img
              style={{ width: '50px' , height: '50px'}}
              className="rounded-circle  d-none d-sm-block d-md-none center"
              src={postAvatar}
              alt=""
            />
            <img
              style={{ width: '75px' , height: '75px'}}
              className="rounded-circle  d-none d-md-block center"
              src={postAvatar}
              alt=""
            />
            <p className="d-flex text-center justify-content-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead d-none d-sm-block">{post.text}</p>
            <p className="lead d-block d-sm-none text-center">{post.text}</p>
            {showActions ? (
              <div>
                <span className="row">
                  {post.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-sm btn-danger mr-1"
                    >
                      Delete
                  </button>
                  ) : null} {" "}

                  <Link to={`/post/${post._id}`} className="btn btn-sm btn-light mr-1">
                    View
                </Link>
                  <button
                    onClick={this.updateLikes.bind(this, post._id)}
                    type="button"
                    className="btn btn-sm btn-light mr-1"
                  >
                    <i
                      className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button
                    onClick={this.onCommentsClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-sm btn-light mr-1 d-none d-sm-block">
                    Comments
                  </button>
                </span>
                {this.state.showReply && commentsContent}
                {this.state.showReply && <CommentWindowForm postId={post._id} />}
                <div className="blockquote-footer bottomcorner d-none d-sm-block" >{fomatted_date}</div>
                <div className="blockquote-footer bottomcorner d-block d-sm-none" >{short_date}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike, getPost })(
  PostItem
);
