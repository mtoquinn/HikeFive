import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentWindow extends Component {
  constructor() {
    super()
    this.state = {
      itemsToShow: 3,
      expanded: false
    }

    this.showMore = this.showMore.bind(this);
  }

  showMore() {
    const { comments } = this.props;

    this.state.itemsToShow === 3 ? (
      this.setState({ itemsToShow: comments.length, expanded: true })
    ) : (
        this.setState({ itemsToShow: 3, expanded: false })
      )
  }

  render() {
    const { comments, postId } = this.props;

    return (
      <div className="container">
        {comments.slice((comments.length - this.state.itemsToShow), (comments.length)).reverse().map((comment, i) =>
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        )}
        <p>
          <button className="btn btn-light mr-1" onClick={this.showMore} >
            {this.state.expanded ? (
              <span>Show less</span>
            ) : (
                <span>Show more</span>
              )
            }
          </button>
        </p>
      </div>);
  }
}

CommentWindow.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};


export default CommentWindow;