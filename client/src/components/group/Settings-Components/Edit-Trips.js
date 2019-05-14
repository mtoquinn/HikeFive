import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { getGroupByHandle } from '../../../actions/groupActions';
import GroupTrips from '../Sub-Components/GroupTrips';

class EditTrip extends Component {
    componentDidMount() {
        this.props.getGroupByHandle(this.props.match.params.handle);
    }

    render() {
        const { group, loading } = this.props.group;

        let TripContent;
        
        if (group === null || loading) {
            TripContent = <Spinner />;
        } else {
            if (Object.keys(group).length > 0) {
                TripContent = (
                    <div>
                        <div className="row">
                            <div className="d-flex justify-content-end col">
                                <Link to={`/groupsettings/${group.handle}`} className="btn btn-dark">Go Back</Link>
                            </div>
                            <div className="d-flex justify-content-start col">
                                <Link to={`/addTrip/${group.handle}`} className="btn btn-dark">Add Trip</Link>
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                        </div><br />
                        <GroupTrips group={group} />
                    </div>
                );
            }
        }

        return (
            <div className="edit trips">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{TripContent}</div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

EditTrip.propTypes = {
    getGroupByHandle: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group,
});

export default connect(mapStateToProps, { getGroupByHandle })(EditTrip);