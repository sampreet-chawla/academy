import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import './App.css';
import ShowCohorts from './components/ShowCohorts';
import CohortForm from './components/CohortForm';
import ShowStudents from './components/ShowStudents';

function App() {
	//const url = 'https://cookbook-api-skc.herokuapp.com/api';
	const url = 'http://localhost:4500/api';

	const emptyCohort = {
		cohortName: '',
		students: [],
	};

	const emptyStudent = {
		studentName: '',
		age: 0,
	};

	const [cohortList, setCohortList] = useState([]);

	const [selectedCohort, setSelectedCohort] = useState(emptyCohort);
	const [selectedStudent, setSelectedStudent] = useState(emptyStudent);

	const getCohorts = () => {
		axios.get(url + '/cohorts/').then((data) => {
			setCohortList(data.data ? data.data.data : []);
			console.log('App data: ', data.data);
		});
	};

	useEffect(getCohorts, []);

	// Handle function to select cohorts
	const selectCohort = (cohort) => {
		setSelectedCohort(cohort);
	};

	// Handle function to select students
	const selectStudent = (student) => {
		setSelectedStudent(student);
	};

	// Handle function to create a cohort
	const handleCreateCohort = (cohort) => {
		axios({
			url: url + '/cohorts/',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			data: JSON.stringify(cohort),
		}).then((data) => {
			setCohortList(data.data ? data.data.data : []);
			console.log('App data: ', data.data);
		});
	};

	//Handle Update cohort when form is submitted
	const handleUpdateCohort = (cohort) => {
		console.log('App selectedCohort: ', cohort);
		axios({
			url: url + '/cohorts/id/' + cohort._id,
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			data: JSON.stringify(cohort),
		}).then((data) => {
			setCohortList(data.data ? data.data.data : []);
			console.log('App data: ', data.data);
		});
	};

	//Handle Delete Cohort
	const deleteCohort = (cohort) => {
		axios({
			url: url + '/cohorts/id/' + cohort._id,
			method: 'delete',
		}).then((data) => {
			setCohortList(data.data ? data.data.data : []);
			console.log('App data: ', data.data);
		});
	};

	return (
		<Router>
			<h2>Welcome to Wow Academy!</h2>
			<Switch>
				<Route
					exact={true}
					path='/'
					render={(rp) => (
						<ShowCohorts
							{...rp}
							cohorts={cohortList}
							selectCohort={selectCohort}
							editCohort={handleUpdateCohort}
							deleteCohort={deleteCohort}
						/>
					)}></Route>
				<Route
					exact
					path='/add-cohort'
					render={(rp) => (
						<CohortForm
							{...rp}
							label='Add Cohort'
							cohort={emptyCohort}
							handleSubmit={handleCreateCohort}
						/>
					)}
				/>
				<Route
					exact
					path='/edit-cohort'
					render={(rp) => (
						<CohortForm
							{...rp}
							label='Edit Cohort'
							cohort={selectedCohort}
							handleSubmit={handleUpdateCohort}
						/>
					)}
				/>
				<Route
					exact
					path='/students'
					render={(rp) => <ShowStudents {...rp} cohort={selectedCohort} />}
				/>
				<Redirect to='/' />
			</Switch>
		</Router>
	);
}

export default App;
