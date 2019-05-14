import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <h1 className="display-3 font-weight-light mb-4 d-none d-sm-block">HikeFive</h1>
                <h1 className="display-4 font-weight-light mb-4 d-block d-sm-none">HikeFive</h1>
                <p className="lead d-none d-sm-block">
                  {' '}
                  Welcome to HikeFive, a social media site built for hikers and climbers. You can join groups, create events, and most importantly meet new friends. Try out our matchmaking and let us do the hard work finding you a hiking or climbing buddy.
                </p>
                <p className="lead d-block d-sm-none">
                  {' '}
                  Welcome to HikeFive, a social media site built for hikers and climbers.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-dark mr-2">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
