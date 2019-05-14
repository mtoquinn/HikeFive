import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupItem from './GroupItem';
import { searchBelongGroups } from '../../actions/groupActions';

class Groups extends Component {
    componentDidMount() {
        this.props.searchBelongGroups(this.props.match.params.id);
    }

    render() {
        const { groups, loading } = this.props.group;
        let groupItems;

        if (groups === null || loading) {
            groupItems = <Spinner />;
        } else {
            if (groups.length > 0) {
                groupItems = groups.map(group => (
                    <GroupItem key={group._id} group={group} />
                ));
            } else {
                groupItems = <h4>No groups found...</h4>;
            }
        }

        return (
            <div className="groups">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Joined Groups</h1>
                            <p className="lead text-center">
                                List of Joined Groups
                            </p>
                            {groupItems}
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

Groups.propTypes = {
    searchBelongGroups: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group
});

export default connect(mapStateToProps, { searchBelongGroups })(Groups);
