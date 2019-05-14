import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectListGroup from '../../common/SelectListGroup';
import { addTrip, getGroupByHandle } from '../../../actions/groupActions';

class AddTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      location: '',
      description: '',
      difficulty: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getGroupByHandle(this.props.match.params.handle);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.group.group) {
      this.setState({
        handle: nextProps.group.group.handle
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const tripData = {
      handle: this.state.handle,
      name: this.state.name,
      date: this.state.date,
      location: this.state.location,
      description: this.state.description,
      difficulty: this.state.difficulty,
    };
    this.props.addTrip(tripData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const diffOptions = [
      { label: '* Difficulty Level', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 }
    ];

    return (
      <div className="add-trip">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add A Trip</h1>
              <p className="lead text-center">
                *All fields are required*
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Date of trip MM/DD/YYYY"
                  name="date"
                  value={this.state.date}
                  onChange={this.onChange}
                  error={errors.date}
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextAreaFieldGroup
                  placeholder="* Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <SelectListGroup
                  placeholder="* Difficulty"
                  name="difficulty"
                  value={this.state.difficulty}
                  onChange={this.onChange}
                  options={diffOptions}
                  error={errors.difficulty}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-dark btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

AddTrip.propTypes = {
  addTrip: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  getGroupByHandle: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  errors: state.errors
});

export default connect(mapStateToProps, { addTrip, getGroupByHandle })(
  withRouter(AddTrip)
);