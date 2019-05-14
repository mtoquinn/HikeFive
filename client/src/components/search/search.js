import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import GroupItem from '../groups/GroupItem';
import { searchProfiles } from '../../actions/profileActions';
import { searchGroups } from '../../actions/groupActions';

class Search extends Component {
  componentDidMount() {
    var query = this.props.match.params.searchString;
    this.props.searchProfiles(query);
    this.props.searchGroups(query);
  }

  render() {
    const { profiles, loading } = this.props.profile;
    const { groups } = this.props.group;

    let profileItems;
    let groupItems;

    if (profiles === null || groups === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0 || groups.length > 0) {
        if (profiles.length > 0) {
          profileItems = profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ));
        }
        else {
          profileItems = <h4 className="text-center">No profiles found...</h4>;
        }
        if (groups.length > 0) {
          groupItems = groups.map(group => (
            <GroupItem key={group._id} group={group} />
          ));
        }
        else {
          groupItems = <h4 className="text-center">No Groups found...</h4>;
        }
      }
      else {
        profileItems = <h4 className="text-center">No profiles found...</h4>;
        groupItems = <h4 className="text-center">No Groups found...</h4>;
      }
    }

    return (
      <div className="search">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col justify-content-center">
              <h1 className="display-4 text-center">Search Results</h1>
              <p className="lead text-center">
                Searched For: {this.props.match.params.searchString}
              </p>
              <ul className="nav row nav-pills justify-content-center text-center" id="searchResults" role="tablist">
                <li className="nav-item nav-li pl-4 active">
                  <a className="nav-link text-white tab-color active px-3" id="user-tab" data-toggle="pill" href="#users" role="tab" aria-controls="users" aria-selected="true">Users</a>
                </li>
                <li className="nav-item nav-li">
                  <a className="nav-link text-white tab-color" id="group-tab" data-toggle="pill" href="#groups" role="tab" aria-controls="groups" aria-selected="false">Groups</a>
                </li>
              </ul>
              <div className="tab-content pl-1" id="searchResultsContent">
                <div className="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="user-tab"> <br />{profileItems}</div>
                <div className="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="group-tab">< br /> {groupItems}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchProfiles: PropTypes.func.isRequired,
  searchGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  group: state.group
});

export default connect(mapStateToProps, { searchProfiles, searchGroups })(Search);
