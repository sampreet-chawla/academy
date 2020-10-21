import React, { useState } from 'react';

const StudentForm = (props) => {
	//STATE FOR THE FORM
	const [formData, setFormData] = useState(props.cohort);

	//FUNCTIONS
	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleSubmit(formData);
		props.history.push('/student');
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				name='studentName'
				value={formData.studentName}
				onChange={handleChange}
			/>
			<input
				type='number'
				name='age'
				value={formData.age}
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

export default StudentForm;
