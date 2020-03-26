import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

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

	//new state to set post request
	const [post, setPost] = useState([]);

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

	const formSubmit = e => {
		e.preventDefault();
		axios.post('https://reqres.in/api/users', formState).then(response => {
			setPost(response.data);
			console.log('success', post);
		});
	};

	return (
		<form onSubmit={formSubmit}>
			<label htmlFor="name">
				Name:
				<input
					id="name"
					type="text"
					name="name"
					value={formState.name}
					onChange={inputChange}
				/>
				{errors.name.length > 0 ? (
					<p className="error"> {errors.name}</p>
				) : null}
			</label>
			<br />

			<label htmlFor="email">
				Email:
				<input
					id="email"
					type="text"
					name="email"
					value={formState.email}
					onChange={inputChange}
				/>
				{errors.email.length > 0 ? ( //don't really understand this
					<p className="error"> {errors.email}</p>
				) : null}
			</label>
			<br />

			<label htmlFor="password">
				Password:
				<input
					type="text"
					name="password"
					value={formState.password}
					onChange={inputChange}
				/>
				{errors.password.length > 0 ? (
					<p className="error"> {errors.password}</p>
				) : null}
			</label>
			<br />
			<label htmlFor="terms" className="terms">
				<input
					type="checkbox"
					name="terms"
					checked={setFormState.terms}
					onChange={inputChange}
				/>
				Terms and Conditions
			</label>

			<button className="button" disabled={buttonDisabled}>
				Submit!
			</button>
		</form>
	);
}

export default Form;
