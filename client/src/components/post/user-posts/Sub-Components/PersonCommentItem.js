import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePersonalComment } from '../../../../actions/postActions';
import defaultAvatar from '../../../../img/defaultAvatar.jpg';

class PersonCommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deletePersonalComment(postId, commentId);
    window.location.reload();
  }

  render() {
    const { comment, postId, auth } = this.props;
    var moment = require('moment');
    var formatted_date = moment(comment.date).format('LLL');
    var short_date = moment(comment.date).format('LT');
    var commentAvatar;

    if(comment.avatar === ''){
      commentAvatar = defaultAvatar;
    }else {
      commentAvatar = comment.avatar;
    }

    return (
      <div className="card card-body border-light mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block center"
              style={{ width: '50px' }}
              src={commentAvatar}
              alt=""
            />

            <p className="d-flex justify-content-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead d-block d-sm-none text-center">{comment.text}</p>
            <p className="lead d-none d-sm-block">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-sm btn-danger mr-1"
              >
                Delete
              </button>
            ) : null}
          </div>
          <div className="blockquote-footer bottomcorner d-none d-sm-block" >{formatted_date}</div>
          <div className="blockquote-footer bottomcorner d-block d-sm-none" >{short_date}</div>
        </div>
      </div>
    );
  }
}

PersonCommentItem.propTypes = {
  deletePersonalComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { deletePersonalComment })(PersonCommentItem);
