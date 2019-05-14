import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroupByHandle, deleteGroup } from '../../../actions/groupActions';
import Spinner from '../../common/Spinner';
import GroupHeader from '../Sub-Components/GroupHeader';
import { getCurrentProfile } from '../../../actions/profileActions';

class Settings extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getGroupByHandle(this.props.match.params.handle);
  }

  onDeleteClick() {
    this.props.deleteGroup(this.props.group.group._id, this.props.history);
  }

  render() {
    const { group, loading } = this.props.group;
    const { profile } = this.props.profile;

    let settingsContent;

    if ((group && profile === null) || loading) {
      settingsContent = <Spinner />;
    } else {
      if (group !== null) {
        if (Object.keys(group).length > 0) {
          const groupownerId = group.ownerid;
          const currentuserId = profile._id;

          if (groupownerId === currentuserId) {
            settingsContent = (
              <div>
                <GroupHeader group={group} />
                <nav className="d-flex justify-content-center navbar navbar-expand-sm navbar-dark bg-dark">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                      <Link className="nav-item nav-link" to={`/groupwall/${group.handle}`}>Wall</Link>
                      <Link className="nav-item nav-link" to={`/groupabout/${group.handle}`}>About</Link>
                      <Link className="nav-item nav-link" to={`/grouptrips/${group.handle}`}>Trips</Link>
                      <Link className="nav-item nav-link" to={`/groupCalendar/${group.handle}`}>Calendar</Link>
                      <Link className="nav-item nav-link" to={`/groupmembers/${group.handle}`}>Members</Link>
                      <Link className="nav-item nav-link active" to={`/groupsettings/${group.handle}`}>Settings</Link>
                    </div>
                  </div>
                </nav>
                <br />
                <div>
                  {/* This is only visible on small screens */}
                  <div className="btn-group-vertical d-flex flex-wrap justify-content-center align-items-center d-none d-md-none" role="group">
                    <Link to={`/edit-group/${group.handle}`} className="btn btn-light">
                      <i className="fas fa-user-circle text-dark mr-1" /> Edit Group
                    </Link>
                    <br></br>
                    <Link to={`/edit-trips/${group.handle}`} className="btn btn-light">
                      <i className="fas fa-user-circle text-dark mr-1" /> Edit Trips
                    </Link>
                    <br></br>
                    <Link to={`/edit-events/${group.handle}`} className="btn btn-light">
                      <i className="fas fa-user-circle text-dark mr-1" /> Edit Events
                    </Link>
                    <br></br>
                    <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                      <i className="fas fa-trash-alt" /> Delete Group </button>
                  </div>

                  {/* This is only visible on screens larger than size small */}
                  <div className="d-none d-md-block " role="group">
                    <div className="card-deck d-flex justify-content-center">
                      <div className="card bg-light text-center" >
                        <div className="card-body">
                          <h5 className="card-title">Edit Group</h5>
                          <p className="card-text">Use this to edit the group information.</p>
                          <Link to={`/edit-group/${group.handle}`} className="btn btn-dark">Edit Group</Link>
                        </div>
                      </div>
                      <div className="card bg-light text-center" >
                        <div className="card-body">
                          <h5 className="card-title">Edit Trips</h5>
                          <p className="card-text">Use this to edit the group trips information.</p>
                          <Link to={`/edit-trips/${group.handle}`} className="btn btn-dark">Edit Trips</Link>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="card-deck d-flex justify-content-center">
                      <div className="card bg-light text-center" >
                        <div className="card-body">
                          <h5 className="card-title">Edit Events</h5>
                          <p className="card-text">Use this to edit the group events information.</p>
                          <Link to={`/edit-events/${group.handle}`} className="btn btn-dark">Edit Events</Link>
                        </div>
                      </div>
                      <div className="card bg-light text-center" >
                        <div className="card-body">
                          <h5 className="card-title">Delete Group</h5>
                          <p className="card-text">This will delete the group and all data.</p>
                          <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete Group</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          else {
            settingsContent = (
              <div>
                <GroupHeader group={group} />
                <nav className="d-flex justify-content-center navbar navbar-expand-sm navbar-dark bg-dark">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                      <Link className="nav-item nav-link" to={`/groupwall/${group.handle}`}>Wall</Link>
                      <Link className="nav-item nav-link" to={`/groupabout/${group.handle}`}>About</Link>
                      <Link className="nav-item nav-link" to={`/grouptrips/${group.handle}`}>Trips</Link>
                      <Link className="nav-item nav-link" to={`/groupCalendar/${group.handle}`}>Calendar</Link>
                      <Link className="nav-item nav-link" to={`/groupmembers/${group.handle}`}>Members</Link>
                    </div>
                  </div>
                </nav>
                <br />
                <div>
                  <h2>Access Denied.</h2>
                </div>
              </div>
            )
          }
        }
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {settingsContent}
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

Settings.propTypes = {
  getGroupByHandle: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  profile: state.profile,
});

export default connect(mapStateToProps, { getGroupByHandle, deleteGroup, getCurrentProfile })(
  Settings
);

