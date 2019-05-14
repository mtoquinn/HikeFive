import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class NowEvent extends Component {
	render() {
		const { evt } = this.props;

		return (
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
			</li>
		);
	}
}

NowEvent.propTypes = {
	comments: PropTypes.array.isRequired,
	postId: PropTypes.string.isRequired
};

export default NowEvent;