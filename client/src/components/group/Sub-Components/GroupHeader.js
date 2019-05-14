import React, { Component } from 'react';
import defaultAvatar from '../../../img/defaultGroupAvatar.jpg';
import defaultBackground from '../../../img/profile.jpg';


class GroupHeader extends Component {

  render() {
    const { group } = this.props;
    const backgroundURL = group.background;

    var groupAvatar;
    var groupBG;

    if (group.avatar === '') {
      groupAvatar = defaultAvatar;
    }
    else {
      groupAvatar = group.avatar;
    }

    // Reference: The CSS class in App.css 'Wrapper' sets the user's profile background.
    // Reference: The CSS class in App.css 'Group-Wrapper' does the same thing, but for group bg pics.

    // Check for an empty string when determining the BG image and
    // use the default BG if it's an empty string.
    if (backgroundURL === '') {
      groupBG = {
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
      groupBG = {
        background: 'url(' + backgroundURL + ') no-repeat center center',
        backgroundSize: 'cover',
        zIndex: '-1',
        position: 'relative',
        height: 250
      };
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body mb-3" style={groupBG}>
            <div className="row">
              <div className="text-center col m-auto">
                <img
                  className="bgSize rounded-circle"
                  src={groupAvatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center text-white">
            <h2 className="text-center font-weight-light d-block d-sm-none">{group.name}</h2>
              <h1 className="display-4 text-center d-none d-sm-block">{group.name}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupHeader;
