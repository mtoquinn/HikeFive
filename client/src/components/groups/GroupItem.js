import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../img/defaultGroupAvatar.jpg';

class GroupItem extends Component {
  render() {
    const { group } = this.props;

    var groupAvatar;

    if (group.avatar === '') {
      groupAvatar = defaultAvatar;
    }
    else {
      groupAvatar = group.avatar;
    }

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2 align-content-center text-center d-none d-md-block">
            <img src={groupAvatar} alt="" className="rounded-circle avatar" />
          </div>
          <div className="col-2 align-content-center text-center d-none d-sm-block d-md-none">
            <img src={groupAvatar} alt="" className="rounded-circle avatar2" />
          </div>
          <div className="col">
            <h3>{group.name}</h3>
            <Link to={`/groupwall/${group.handle}`} className="btn btn-dark">
              View Group
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired
};

export default GroupItem;
