import {assert} from "../errors";

export async function handleAuthSubmit(e, route){
	e.preventDefault();

		try {
			if (route === 'register') {
				assertRegister(this.props)
			}
			
			const response = await fetch(`http://localhost:9000/api/v1/auth/${route}`, {
				method: 'POST',
				body: JSON.stringify({email: this.props.email, password: this.props.password}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			assert(response.ok, response.statusText);
			
			const { token } = await response.json();
			
			localStorage.setItem('token', token);
			
			alert(JSON.stringify({ token }));
		}
		catch(error) {
			alert(error.message);
		}
}


const assertRegister = props => {
	assert(props.emailValidity, 'Проверьте ваш имейл');
	assert(props.passwordValidity, 'Проверьте ваш пароль');
	assert(props.confirmPasswordValidity, 'Пароль не сходится');
}
