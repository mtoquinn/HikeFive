import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SelectListGroup from '../common/SelectListGroup';
import { getCurrentProfile } from '../../actions/profileActions';
import { addMatchData } from '../../actions/profileActions';

class MatchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillMin: '',
      skillMax: '',
      travel: '',
      camp: '',
      climber: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        country: profile.country
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const matchData = {
      skillMin: this.state.skillMin,
      skillMax: this.state.skillMax,
      travel: this.state.travel,
      camp: this.state.camp,
      climber: this.state.climber,
      country: this.state.country
    };
    this.props.addMatchData(matchData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const MinSkilloptions = [
      { label: '* Minimum', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 }
    ];

    // Select options for status
    const MaxSkilloptions = [
      { label: '* Maximum', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 }
    ];

    const options = [
      { label: '* Select', value: 0 },
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' }
    ];

    return (
      <div className="match-form">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center d-none d-sm-block">Matchmaking Form</h1>
              <h1 className="font-weight-light text-center d-block d-sm-none">Matchmaking Form</h1>
              <h5 className="d-block pb-3 text-center">* denotes a required field</h5>

              <form onSubmit={this.onSubmit}>
                <div className="text-center">
                  <h5 className="text-center">What skill level are you looking for?</h5>
                  <div className="row">
                    <div className="col-6 ">
                      <SelectListGroup
                        placeholder="skillMin"
                        name="skillMin"
                        value={this.state.skillMin}
                        onChange={this.onChange}
                        options={MinSkilloptions}
                        error={errors.skillMin}
                      />
                    </div>
                    <div className="col-6">
                      <SelectListGroup
                        placeholder="skillMax"
                        name="skillMax"
                        value={this.state.skillMax}
                        onChange={this.onChange}
                        options={MaxSkilloptions}
                        error={errors.skillMax}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-center">Are you looking to Travel?</h5>
                  <SelectListGroup
                    placeholder="travel"
                    name="travel"
                    value={this.state.travel}
                    onChange={this.onChange}
                    options={options}
                    error={errors.travel}
                  />
                </div>
                <div>
                  <h5 className="text-center">Are you looking for a camping trip?</h5>
                  <SelectListGroup
                    placeholder="camp"
                    name="camp"
                    value={this.state.camp}
                    onChange={this.onChange}
                    options={options}
                    error={errors.camp}
                  />
                </div>
                <div>
                  <h5 className="text-center">Do you want to go climbing?</h5>
                  <SelectListGroup
                    placeholder="climber"
                    name="climber"
                    value={this.state.climber}
                    onChange={this.onChange}
                    options={options}
                    error={errors.climber}
                  />
                </div>
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

MatchForm.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  addMatchData: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, addMatchData })(withRouter(MatchForm));