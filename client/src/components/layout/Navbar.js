import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  onSearchClick = () => {
    var searchString = document.getElementById("query").value;
    if (searchString !== '') {
      this.props.history.push(`/search/${searchString}`);
    }
  }

  /*
  componentWillReceiveProps(nextProps) {
  if(nextProps.auth.user !== null){
    console.log(nextProps);
    if(!nextProps.auth.user.create_profile){
      this.props.history.push('/create-profile');
    }
  }
}*/

  render() {
    const { isAuthenticated, user } = this.props.auth;

    let authLinks;

    if(user.create_profile !== null && user.create_profile !== undefined){
      console.log(user.create_profile);
      if(!user.create_profile){
        console.log(user.create_profile);
        this.props.history.push('/create-profile');
      }
    }

    authLinks = (
      <ul className="navbar-nav ml-auto ">
        <form className="form-inline">
          <button className="btn btn-elegant search-button " type="submit" onClick={this.onSearchClick.bind()}>Search</button>
          <input className="form-control mt-1 mb-1" type="search" placeholder="Search" aria-label="Search" id="query" />
        </form>
        <li className="nav-item">
          <Link className="nav-link text-light mt-1 mb-1" to="/feed">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light mt-1 mb-1" to="/groups-landing">
            {' '}
            Groups
          </Link>
        </li>

        <li className="nav-item dropdown align-items-center mt-1 mb-1">
          <a className="nav-link dropdown-toggle text-light" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {user.name}
          </a>
          <div className="dropdown-menu bg-dark" aria-labelledby="userDropdown">
            <Link className="nav-link mt-1 mb-1 text-light" to="/profile">
              Profile
            </Link>
            <Link className="nav-link mt-1 mb-1 text-light" to="/matchmaking">
              Matchmaking
            </Link>
            <Link className="nav-link mt-1 mb-1 text-light" to="/user-settings">
              Settings
            </Link>
            <a onClick={this.onLogoutClick.bind(this)} className="nav-link text-light mt-1 mb-1" href="/">
              Logout
            </a>
          </div>
        </li>
      </ul>
    );

    // Links when not logged in
    const guestLinks = (
      <ul className="navbar-nav ml-auto" >
        <li className="nav-item">
          <Link className="nav-link mt-1 mb-1 text-light" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link mt-1 mb-1 text-light" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const created = (
      <Link className="navbar-brand" to="/feed">
        <img className="rounded-circle logo" src="https://i.imgur.com/gfra7Eh.jpg" title="source: imgur.com" alt="" />{' '}
        HikeFive
      </Link>
    );

    const notCreated = (
      <div className="row align-items-center">
        <img className="rounded-circle ml-4 logo" src="https://i.imgur.com/gfra7Eh.jpg" title="source: imgur.com" alt="" />{' '}
        <h5 className="col-2 text-white mt-2">HikeFive</h5>
      </div>
    );


    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 ">
        <div className="container">
          {created}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Navbar));
