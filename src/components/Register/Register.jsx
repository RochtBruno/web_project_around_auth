import { useState } from 'react';

import { register } from '../../utils/auth.js'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorInfo, setErrorInfo] = useState("");

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try{
			console.log("start loading")
			if(email == "" || password == ''){
				throw new Error("Campos vazios não são válidos");
			}
			const response = await register({email,password})
			if(response.status == 400){
				const message = await response.json();
				throw new Error(message.error);
			}
			const result = await response.json();
			console.log(result)
			if(!result.data.email || result.data._id){
				throw new Error(`Data não recebida: ${result}`);
			}
			navigate("/signin", {replace: true});
		}catch(error){
			setErrorInfo(error.message);
		}finally{
			console.log("end loading")
		}
	}

	return(
		<>
			<div className="register">
				<h2 className="register__title">Inscreva-se</h2>
				<p className="register__title">{errorInfo}</p>
				<form className="register__form" action="" onSubmit={handleSubmit}>

					<input className="register__input" 
					type="text" 
					value={email} 
					name="email" 
					placeholder="E-mail" 
					onChange={(e) => {setEmail(e.target.value)}}/>

					<input className="register__input" 
					type="password" 
					value={password} 
					name="password" 
					placeholder="Senha"
					onChange={(e) => {setPassword(e.target.value)}}/>

					<button className="register__btn">Inscrever-se</button>
				</form>
				<a className="register__link" href="/signin">Já é membro? Faça o login aqui!</a>
			</div>
		</>
	)
}

export default Register