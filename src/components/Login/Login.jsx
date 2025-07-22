function Login() {
	return(
		<>
			<div className="login">
				<h2 className="login__title">Entrar</h2>
				<input className="login__input" type="text" name="email" placeholder="E-mail"/>
				<input className="login__input" type="text" name="password" placeholder="Senha"/>
				<button className="login__btn">Entrar</button>
				<a className="login__link" href="/signup">Ainda não é membro? Inscreva-se aqui!</a>
			</div>
		</>
	)
}

export default Login