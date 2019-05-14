import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick() {
    this.props.deleteAccount();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          {/* This is only visible on small screens  */}
          <div className="btn-group-vertical d-flex flex-wrap justify-content-center align-items-center d-none d-md-none" role="group">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-dark mr-1" /> Edit Profile
              </Link>
            <br></br>
            <Link to="/edit-trips" className="btn btn-light">
              <i className="fas fa-user-circle text-dark mr-1" /> Edit Trips
              </Link>
            <br></br>
            <Link to="/change-password" className="btn btn-light">
              <i className="fas fa-key text-dark mr-1" /> Change Password
              </Link>
            <br></br>
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
              <i className="fas fa-trash-alt" /> Delete My Account </button>
          </div>

          {/* This is only visible on screens larger than size small */}
          <div className="d-none d-md-block " role="group">
            <div className="card-deck d-flex justify-content-center">
              <div className="card bg-light text-center" >
                <div className="card-body">
                  <h5 className="card-title">Edit Profile</h5>
                  <p className="card-text">Use this to edit your profile information.</p>
                  <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>
                </div>
              </div>
              <div className="card bg-light text-center" >
                <div className="card-body">
                  <h5 className="card-title">Edit Trips</h5>
                  <p className="card-text">Use this to edit your trips information.</p>
                  <Link to="/edit-trips" className="btn btn-dark">Edit Trips</Link>
                </div>
              </div>
            </div>
            <br />
            <div className="card-deck d-flex justify-content-center">
              <div className="card bg-light text-center" >
                <div className="card-body">
                  <h5 className="card-title">Change Password</h5>
                  <p className="card-text">Use this to change your password.</p>
                  <Link to="/change-password" className="btn btn-dark">Change Password</Link>
                </div>
              </div>
              <div className="card bg-light text-center" >
                <div className="card-body">
                  <h5 className="card-title">Delete Account</h5>
                  <p className="card-text">This will delete your account and all data.</p>
                  <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="d-flex flex-wrap justify-content-center align-items-center display-4">Settings</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

