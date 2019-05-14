import React, { Component } from 'react';
import defaultBackground from '../../../img/profile.jpg';
import defaultAvatar from '../../../img/defaultAvatar.jpg';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    const backgroundURL = profile.background;
    var profileBG;

    // Check for an empty string when determining the BG image and
    // use the default BG if it's an empty string.
    if (backgroundURL === '') {
      profileBG = {
        background: 'url(' + defaultBackground + ') no-repeat center center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: '-1',
        position: 'relative',
        height: 250
      };
    } else {
      // Reference: The CSS class in App.css 'Wrapper' sets the user's profile background.
      // Reference: The CSS class in App.css 'Group-Wrapper' does the same thing, but for group bg pics.
      profileBG = {
        background: 'url(' + backgroundURL + ') no-repeat center center',
        backgroundSize: 'cover',
        zIndex: '-1',
        position: 'relative',
        height: 250
      };
    }

    var profileAvatar;
    if (profile.avatar === '') {
      profileAvatar = defaultAvatar;
    }
    else {
      profileAvatar = profile.avatar;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body mb-3" style={profileBG}>
            <div className="row">
              <div className="d-flex justify-content-center col-4 col-md-3 m-auto">
                <img
                  className="bgSize rounded-circle"
                  src={profileAvatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center text-white">
              <h2 className="text-center font-weight-light d-block d-sm-none">{profile.user.name}</h2>
              <h1 className="display-4 text-center d-none d-sm-block">{profile.user.name}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
