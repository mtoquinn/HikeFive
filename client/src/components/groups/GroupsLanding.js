import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../actions/profileActions';

class Landing extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onSearchClick = () => {
        var searchString = document.getElementById("query2").value;
        if (searchString !== '') {
            this.props.history.push(`/search-groups/${searchString}`);
        }
    }

    onSearchClick2 = () => {
        var searchString = document.getElementById("query3").value;
        if (searchString !== '') {
            this.props.history.push(`/search-groups/${searchString}`);
        }
    }

    render() {
        const { profile, loading } = this.props.profile;
        let landingContent;

        if (profile === null || loading) {
            landingContent = <Spinner />;
        } else {
            landingContent = (
                <div>
                    <div className="d-block d-sm-none" role="group">
                        <br />
                        <div className="card-deck d-flex justify-content-center mb-2">
                            <div className="card bg-light text-center" >
                                <div className="card-body">
                                    <h5 className="text-center">Create A New Group</h5>
                                    <Link to="/create-group" className="btn btn-dark">Create</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-deck d-flex justify-content-center mb-2">
                            <div className="card bg-light text-center" >
                                <div className="card-body">
                                    <h5 className="text-center">Search For A Group</h5>
                                    <form className="form justify-content-center md-form mr-auto ">
                                        <input className="form-control mb-2" type="search" placeholder="Search" aria-label="Search" id="query3" />
                                        <button className="btn btn-dark btn-rounded" type="submit" onClick={this.onSearchClick2.bind()}>Search</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className="card-deck d-flex justify-content-center mb-2">
                            <div className="card bg-light text-center" >
                                <div className="card-body">
                                    <h5 className="text-center">View Your Groups</h5>
                                    <Link to={`/mygroups/${profile._id}`} className="btn btn-dark">View</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-none d-sm-block d-lg-none" role="group">
                        <br />
                        <div className="card-deck d-flex justify-content-center mb-4">
                            <div className="card bg-light text-center" >
                                <div className="card-body">
                                    <h5 className="text-center">Create A New Group</h5>
                                    <Link to="/create-group" className="btn btn-dark">Create</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-deck d-flex justify-content-center mb-4">
                            <div className="card bg-light text-center" >
                                <div className="card-body">
                                    <h5 className="text-center">Search For A Group</h5>
                                    <form className="form justify-content-center md-form mr-auto ">
                                        <input className="form-control mb-2" type="search" placeholder="Search" aria-label="Search" id="query3" />
                                        <button className="btn btn-dark btn-rounded" type="submit" onClick={this.onSearchClick2.bind()}>Search</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className="card-deck d-flex justify-content-center mb-4">
                            <div className="card bg-light text-center" >
                                <div className="card-body">
                                    <h5 className="text-center">View Your Groups</h5>
                                    <Link to={`/mygroups/${profile._id}`} className="btn btn-dark">View</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-none d-lg-block " role="group">
                        <br />
                        <div className="card-deck d-flex justify-content-center">
                            <div className="card bg-light text-center" >
                                <div className="card-body">
                                    <h5 className="card-title">Create A Group</h5>
                                    <p className="card-text">Use this to create a new group.</p>
                                    <Link to="/create-group" className="btn btn-dark">Create</Link>
                                </div>
                            </div>
                            <div className="card bg-light text-center" >
                                <div className="card-body">
                                    <h5 className="card-title">Search Groups</h5>
                                    <p className="card-text">Search all existing groups.</p>
                                    <form className="form">
                                        <input className="form-control mb-2" type="search" placeholder="Search" aria-label="Search" id="query2" />
                                        <button className="btn btn-dark btn-rounded" type="submit" onClick={this.onSearchClick.bind()}>Search</button>
                                    </form>
                                </div>
                            </div>
                            <div className="card bg-light text-center" >
                                <div className="card-body">
                                    <h5 className="card-title">My Groups</h5>
                                    <p className="card-text">See all the groups you are a member of</p>
                                    <Link to={`/mygroups/${profile._id}`} className="btn btn-dark">View</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="group-landing">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="d-flex flex-wrap justify-content-center align-items-center display-4">Groups</h1>
                            {landingContent}
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

Landing.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(withRouter(Landing));

