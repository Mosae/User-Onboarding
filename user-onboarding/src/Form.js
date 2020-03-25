import React from 'react';

function Form() {
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
		</form>
	);
}

export default Form;
