import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class MatchLanding extends Component {

    render() {
        let landingContent;
        landingContent = (
            <div>
                <div className="d-block d-sm-none" role="group">
                    <br />
                    <div className="card-deck d-flex justify-content-center">
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="text-center">Find New Matches</h5>
                                <Link to="/match" className="btn btn-dark">Continue</Link>
                            </div>
                        </div>
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="text-center">Review Matches</h5>
                                <Link to="/matches" className="btn btn-dark">Review</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-none d-sm-block " role="group">
                    <br />
                    <div className="card-deck d-flex justify-content-center">
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="card-title">Find New Matches</h5>
                                <p className="card-text">This will take you to the Match-Making form.</p>
                                <Link to="/match" className="btn btn-dark">Continue</Link>
                            </div>
                        </div>
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="card-title">Review Matches</h5>
                                <p className="card-text">This will show the matches from your last search</p>
                                <Link to="/matches" className="btn btn-dark">View</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="group-landing">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="text-center display-5 font-weight-light">Matchmaking</h1>
                            {landingContent}
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default (withRouter(MatchLanding));

