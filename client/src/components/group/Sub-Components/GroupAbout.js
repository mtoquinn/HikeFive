import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../validation/is-empty';

class GroupAbout extends Component {
  render() {
    const { group } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-dark">About</h3>
            <p className="lead">
              {isEmpty(group.bio) ? (
                <span className="d-flex flex-wrap justify-content-center align-items-center">No Bio</span>
              ) : (
                  <span className="d-flex flex-wrap justify-content-center align-items-center">{group.bio}</span>
                )}
            </p>
            <hr />
            <div className="row">
              <div className="col-md">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  Location: {group.zip}<br></br>
                  Skill Level: {group.skillstatus}
                </div>
              </div>
              <div className="col-md">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  Climber: {group.climber}<br></br>
                  Camper: {group.camp}<br></br>
                  Traveler: {group.travel}<br></br>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {isEmpty(group.social && group.social.facebook) ? null : (
                    <a href={group.social.facebook}>Facebook</a>
                  )}<br></br>
                  {isEmpty(group.social && group.social.twitter) ? null : (
                    <a href={group.social.twitter}>Twitter</a>
                  )}
                </div>
              </div>
              <div className="col-md">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {isEmpty(group.social && group.social.instagram) ? null : (
                    <a href={group.social.instagram}>Instagram</a>
                  )}<br></br>
                  {isEmpty(group.social && group.social.youtube) ? null : (
                    <a href={group.social.youtube}>YouTube</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupAbout.propTypes = {
  group: PropTypes.object.isRequired
};

export default GroupAbout;
