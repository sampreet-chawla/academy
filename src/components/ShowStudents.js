import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShowStudents = (props) => {
	const cohort = props.cohort;
	console.log('ShowStudents cohort:', cohort);

	return <h4>Show Students component</h4>;
};

export default ShowStudents;
