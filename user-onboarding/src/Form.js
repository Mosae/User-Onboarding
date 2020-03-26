import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

function Form() {
	//set up state for form inputs

	const [formState, setFormState] = useState({
		name: '',
		email: '',
		password: ''
	});
	// state for  errors

	const [erros, setErrors] = useState({
		name: '',
		email: '',
		password: ''
	});
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

			<button className="button" disabled={true}>
				Submit!
			</button>
		</form>
	);
}

export default Form;
