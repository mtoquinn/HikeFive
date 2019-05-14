import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEvent } from '../../../actions/groupActions';

class GroupEvents extends Component {
  onDeleteClick(id) {
    this.props.deleteEvent(this.props.group, id);
  }

  render() {
    const eventItems = this.props.group.events.map(evt => (
      <li key={evt._id} className="d-flex list-group-item justify-content-center align-items-center flex-column bg-light">
        <h4>{evt.name}</h4>
        <p>
          Start: <Moment format="MM/DD/YY">{evt.start}</Moment> 
        </p>
        <p>
          End: <Moment format="MM/DD/YY">{evt.end}</Moment> 
        </p>
        <p>
          {evt.location === '' ? null : (
            <span>
              Location: {evt.location} 
            </span>
          )}
        </p>
        <p>
          About:
        </p>
        <p>
          {evt.description === '' ? null : (
            <span>
              {evt.description}
            </span>
          )}
        </p>
        <p>
          <button
            onClick={this.onDeleteClick.bind(this, evt._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center">Events</h3>
            {eventItems.length > 0 ? (
              <ul className="list-group list-group-flush">{eventItems}</ul>
            ) : (
                <p className="d-flex flex-wrap justify-content-center align-items-center">No Events</p>
              )}
          </div>
        </div>
      </div>
    );
  }
}

GroupEvents.propTypes = {
  deleteEvent: PropTypes.func.isRequired
};

export default connect(null, { deleteEvent })(GroupEvents);