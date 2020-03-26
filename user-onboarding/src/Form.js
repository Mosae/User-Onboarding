import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
//import axios from 'axios';

const formSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup
		.string()
		.email('Must be a valid email address.')
		.required('Must include email address.'),
	password: yup.string().required('Please enter password'),
	terms: yup.boolean().oneOf([true], 'Please agree to terms of use')
});
function Form() {
	//set up state for form inputs

	const [formState, setFormState] = useState({
		name: '',
		email: '',
		password: '',
		terms: ''
	});
	// state for  errors

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		terms: ''
	});
	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		// pass entire state into the schema to validate user input before allowing user to submit
		formSchema.isValid(formState).then(valid => {
			setButtonDisabled(!valid);
		});
	}, [formState]);

	const validateChange = e => {
		yup
			.reach(formSchema, e.target.name)
			.validate(e.target.value)
			.then(valid => {
				setErrors({
					...errors,
					[e.target.name]: ''
				});
			})
			.catch(err => {
				setErrors({
					...errors,
					[e.target.name]: err.errors
				});
			});
	};

	const inputChange = e => {
		e.persist();
		const newFormData = {
			...formState,
			[e.target.name]:
				e.target.type === 'checkbox' ? e.target.checked : e.target.value
		};
		validateChange(e);
		setFormState(newFormData);
	};

	return (
		<form>
			<label htmlFor="name">
				Name:
				<input id="name" type="text" name="name" />
			</label>
			<br />

			<label htmlFor="email">
				Email:
				<input id="email" type="text" name="email" />
			</label>
			<br />

			<label htmlFor="password">
				Password:
				<input type="text" name="password" />
			</label>
			<br />
			<label htmlFor="terms" className="terms">
				<input type="checkbox" name="terms" checked={false} />
				Terms and Conditions
			</label>

			<button className="button" disabled={buttonDisabled}>
				Submit!
			</button>
		</form>
	);
}

export default Form;
