import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShowCohorts = (props) => {
	const cohorts = props.cohorts;
	console.log('ShowCohorts cohorts:', cohorts);

	const loadCohorts = () => {
		const cohortsJSX = cohorts.map((cohort) => {
			return (
				<article
					key={cohort._id}
					style={{ border: '1px solid', margin: '0px 50px', padding: '10px' }}>
					<p>
						{cohort.cohortName}
						&nbsp;&nbsp;
						<button
							onClick={() => {
								props.selectCohort(cohort);
								props.history.push('/edit-cohort');
							}}>
							Edit Cohort
						</button>
						&nbsp;&nbsp;
						<button
							onClick={() => {
								props.deleteCohort(cohort);
							}}>
							Delete Cohort
						</button>
					</p>
					<p>
						# of Students Enrolled: {cohort.students.length} &nbsp;&nbsp;
						<button
							onClick={() => {
								props.selectCohort(cohort);
								props.history.push('/students');
							}}>
							Show Students
						</button>
					</p>
				</article>
			);
		});

		return cohortsJSX;
	};

	const showCohorts = cohorts ? (
		cohorts.length > 0 ? (
			loadCohorts()
		) : (
			<h5>No Cohorts Found</h5>
		)
	) : (
		<h5>Loading...</h5>
	);
	return (
		<div>
			<h4>Cohorts</h4>
			<Link to='/add-cohort'>
				<button>Add Cohort</button>
			</Link>
			{showCohorts}
		</div>
	);
};

export default ShowCohorts;
