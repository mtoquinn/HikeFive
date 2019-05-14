import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileHeader from '../Sub-Components/ProfileHeader';
import ProfileCreds from '../Sub-Components/ProfileCreds';
import Spinner from '../../common/Spinner';
import { getProfileByHandle } from '../../../actions/profileActions';
import { Link } from 'react-router-dom';

class Trips extends Component {
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

    let TripsContent;

    if (profile === null || loading) {
      TripsContent = <Spinner />;
    }
    else {
      if (Object.keys(profile).length > 0) {
        TripsContent = (
          <div>
            <ProfileHeader profile={profile} />
            <nav className="d-flex justify-content-center navbar navbar-expand-sm navbar-dark bg-dark">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-item nav-link" to={`/wall/${profile.handle}`}>Wall</Link>
                  <Link className="nav-item nav-link" to={`/about/${profile.handle}`}>About</Link>
                  <Link className="nav-item nav-link active" to={`/trips/${profile.handle}`}>Trips</Link>
                </div>
              </div>
            </nav>
            <br />
            <ProfileCreds trip={profile.trip} />
          </div>
        );
      }
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{TripsContent}</div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

Trips.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(Trips);
