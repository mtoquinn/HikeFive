import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GroupHeader from '../Sub-Components/GroupHeader';
import Spinner from '../../common/Spinner';
import GroupMembers from '../Sub-Components/GroupMembers';
import { addMember, getGroupByHandle } from '../../../actions/groupActions';
import { getCurrentProfile } from '../../../actions/profileActions';

class Members extends Component {
  constructor(props) {
    super(props)
    this.state = { show: true }
    this.joinGroup = this.joinGroup.bind(this)
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getGroupByHandle(this.props.match.params.handle);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.group.group === null && this.props.group.loading) {
      this.props.history.push('/not-found');
    }
  }

  joinGroup(addMemberData) {
    const { show } = this.state;
    this.props.addMember(addMemberData);
    this.setState({ show: !show })
  }

  render() {
    const { group, loading } = this.props.group;
    const { profile } = this.props.profile;

    let groupContent;

    if ((group && profile === null) || loading) {
      groupContent = <Spinner />;
    } else {
      if (group !== null) {
        const groupownerId = group.ownerid;
        const currentuserId = profile._id;
        const addMemberData = { userId: currentuserId, groupHandle: group.handle };
        var hideornot = false;

        let groupSetting;
        let joinMem;

        if (group.ownerid === currentuserId) { hideornot = true }
        const arrayLength = group.teammember.length;

        for (var i = 0; i < arrayLength; i++) {
          if (group.teammember[i].ids === currentuserId) { hideornot = true }
        }
        if (hideornot === false) {
          joinMem = <button className="btn btn-dark" onClick={() => this.joinGroup(addMemberData)}> Join Group </button>
        }
        else {
          joinMem = null;
        }

        if (groupownerId === currentuserId) {
          groupSetting = (<Link className="nav-item nav-link" to={`/groupsettings/${group.handle}`}>Settings</Link>);
        }
        groupContent = (
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
                  <Link className="nav-item nav-link active" to={`/groupmembers/${group.handle}`}>Members</Link>
                  {groupSetting}
                  {this.state.show && joinMem}
                </div>
              </div>
            </nav>
            <br />
            <div />
            <GroupMembers group={group} />
          </div>
        );
      }
    }

    return (
      <div className="group">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{groupContent}</div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

Members.propTypes = {
  group: PropTypes.object.isRequired,
  addMember: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getGroupByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  group: state.group
});

export default connect(mapStateToProps, { addMember, getGroupByHandle, getCurrentProfile })(Members);
