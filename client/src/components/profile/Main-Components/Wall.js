import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileHeader from '../Sub-Components/ProfileHeader';
import Spinner from '../../common/Spinner';
import { getProfileByHandle } from '../../../actions/profileActions';
import ProfileFeed from '../Sub-Components/ProfileFeed';
import { Link } from 'react-router-dom';

class Wall extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let WallContent;

    if (profile === null || loading) {
      WallContent = <Spinner />;
    } else {
      WallContent = (
        <div>
          <ProfileHeader profile={profile} />
          <nav className="d-flex justify-content-center navbar navbar-expand-sm navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link active" to={`/wall/${profile.handle}`}>Wall</Link>
                <Link className="nav-item nav-link" to={`/about/${profile.handle}`}>About</Link>
                <Link className="nav-item nav-link" to={`/trips/${profile.handle}`}>Trips</Link>
              </div>
            </div>
          </nav>
          <br />
          <ProfileFeed profile={profile.handle} />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{WallContent}</div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

Wall.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(Wall);
