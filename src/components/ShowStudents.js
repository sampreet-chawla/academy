import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShowStudents = (props) => {
	const selectedCohort = props.selectedCohort;
	console.log('ShowStudents cohort:', selectedCohort);
	const cohortId = selectedCohort._id;
	const cohortName = selectedCohort.cohortName;

	const loadStudents = () => {
		console.log('In loadStudents');
		const studentsJSX = selectedCohort.students.map((student, index) => {
			console.log('In loadStudents, inside map ', student);
			const backgroundColor = index % 2 !== 0 ? 'lightgrey' : 'white';
			return (
				<article
					key={student._id}
					style={{
						border: '1px solid',
						margin: '0px 50px',
						padding: '2px',
						contentAlign: 'center',
						backgroundColor: backgroundColor,
					}}>
					<p>
						#{index + 1} {student.studentName}, age: {student.age}&nbsp;&nbsp;
						<button
							onClick={() => {
								props.selectStudent(student);
								props.history.push('/edit-student');
							}}>
							Edit
						</button>
						&nbsp;&nbsp;
						<button
							onClick={() => {
								props.deleteStudent(student);
								console.log('ShowStudents.. props.History', props.history);
								props.history.push('/');
							}}>
							Delete
						</button>
					</p>
				</article>
			);
		});
		return studentsJSX;
	};

	const showStudents =
		selectedCohort.students && selectedCohort.students.length > 0 ? (
			loadStudents()
		) : (
			<h5>No students in the cohort..., Please add!</h5>
		);

	return (
		<div>
			<h4>{cohortName} : Students</h4>
			<Link to='/add-student'>
				<button>Add Student</button>
			</Link>
			{showStudents}
			<p>
				<Link to='/'>
					<button>Back to Home</button>
				</Link>
			</p>
		</div>
	);
};

export default ShowStudents;
