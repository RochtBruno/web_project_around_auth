import { useState } from 'react';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx'
import { authorize } from '../../utils/auth.js'
import { Link, useNavigate } from 'react-router-dom'

function Login({setLoggedIn}) {

	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("")
	const [errorInfo, setErrorInfo] = useState("");
	const [isTooltipOpen,setIsTooltipOpen] = useState(false);
	const [tooltipStatus, setTooltipStatus] = useState("success");
	const [tooltipMessage, setTooltipMessage] = useState("");
	const [shouldRedirect, setShouldRedirect] = useState(false);

	const navigate = useNavigate()

	async function handleLogin(e) {
		e.preventDefault();
		try{
			console.log("start loading")
			if(email == "" || password == ''){
				throw new Error("Campos vazios não são válidos");
			}
			const response = await authorize({email,password})
			if(response.status == 400 || response.status == 401){
				const message = await response.json();
				throw new Error(message.error);
			}
			const result = await response.json();
			if(!result.token){
				throw new Error(`Data não recebida: ${result}`);
			}
			console.log(result.token)
			localStorage.setItem("jwt",result.token);
			setLoggedIn(true);
			setTooltipStatus("success");
			setTooltipMessage("Login realizado com sucesso");
			setIsTooltipOpen(true);
			setShouldRedirect(true);
		}catch(error){
			setTooltipStatus("failure");
			setTooltipMessage(error.message);
			setIsTooltipOpen(true);
			setShouldRedirect(false);
			setEmail("");
			setPassword("")
		}finally{
			console.log("end loading")
		}
	}

	const handleCloseTooltip = () => {
		setIsTooltipOpen(false);
		if (shouldRedirect) {
			navigate("/", {replace:true});
		}
	};

	return(
		<>
			<div className="login">
				<h2 className="login__title">Entrar</h2>
				{/* <p className="login__title">{errorInfo}</p> */}
				<form className="login__form" action="" onSubmit={handleLogin}>

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

					<button className="register__btn">Entrar</button>
				</form>
				<Link className="login__link" to="/signup">Ainda não é membro? Inscreva-se aqui!</Link>
			</div>
			{isTooltipOpen && (
				<div className="popup__overlay">
					<InfoTooltip status={tooltipStatus} message={tooltipMessage} onClose={handleCloseTooltip}/>
				</div>
			)}
		</>
	)
}

export default Login