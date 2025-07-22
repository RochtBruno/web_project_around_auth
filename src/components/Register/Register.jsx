function Register() {
	return(
		<>
			<div className="register">
				<h2 className="register__title">Inscreva-se</h2>
				<input className="register__input" type="text" name="email" placeholder="E-mail"/>
				<input className="register__input" type="text" name="password" placeholder="Senha"/>
				<button className="register__btn">Inscrever-se</button>
				<a className="register__link" href="/signin">Já é membro? Faça o login aqui!</a>
			</div>
		</>
	)
}

export default Register