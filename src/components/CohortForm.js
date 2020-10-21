import React, { useState } from 'react';

const CohortForm = (props) => {
	//STATE FOR THE FORM
	const [formData, setFormData] = useState(props.cohort);

	//FUNCTIONS
	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleSubmit(formData);
		props.history.push('/');
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				name='cohortName'
				value={formData.cohortName}
				onChange={handleChange}
			/>
			<input
				type='hidden'
				name='_id'
				value={formData._id}
				onChange={handleChange}
			/>
			<input type='submit' value={props.label} />
		</form>
	);
};

export default CohortForm;
