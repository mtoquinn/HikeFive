import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../../common/TextAreaFieldGroup';
import { addComment } from '../../../../actions/postActions';
import { getCurrentProfile } from '../../../../actions/profileActions';
import { withRouter } from 'react-router-dom';

class CommentWindowForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const { postId } = this.props;
    const { errors } = this.state;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: profile.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: '' });
    if(this.state.text != '')
    { 
      this.props.history.push({
        pathname: `/post/${postId}`, 
        state: { reload: 0 }
      });  
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-dark text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-sm btn-dark">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentWindowForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment, getCurrentProfile })(withRouter(CommentWindowForm));
