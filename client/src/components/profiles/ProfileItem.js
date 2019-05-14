import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../img/defaultAvatar.jpg';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    var profileAvatar;

    if (profile.avatar === '') {
      profileAvatar = defaultAvatar;
    }
    else {
      profileAvatar = profile.avatar;
    }

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2 align-content-center text-center d-none d-md-block">
            <img src={profileAvatar} alt="" className="rounded-circle text-center avatar" />
          </div>
          <div className="col-2 align-content-center text-center d-none d-sm-block d-md-none">
            <img src={profileAvatar} alt="" className="rounded-circle text-center avatar2" />
          </div>
          <div className="col">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
            </p>
            <Link to={`/wall/${profile.handle}`} className="btn btn-dark">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
