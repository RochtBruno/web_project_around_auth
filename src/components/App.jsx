import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'
import Main from './Main/Main.jsx'
import Register from './Register/Register.jsx'
import Login from './Login/Login.jsx'
import {useState, useEffect} from 'react'
import api from '../utils/api.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import {Routes,Route} from 'react-router-dom'

function App() {
	const [currentUser, setCurrentUser] = useState({})
	const [card, setCard] = useState([])
	const [popup, setPopup] = useState(null);
	const [isLoading, setLoading] = useState(false)

	useEffect(() => {
		api.getUser()
		.then((res) => res.json())
		.then((data) => setCurrentUser(data))
	},[])

	const handleUpdateUser = (name,about) => {
		setLoading(true)
		api.updateUser(name,about)
		.then((res) => res.json())
		.then((userData) => {
			setCurrentUser(userData)
		})
		.catch((err)=>{
			console.log("Erro ao atualizar usuário",err)
		})
		.finally(() => setLoading(false))
	}

	const handleUpdateAvatar = (avatarUrl) => {
		setLoading(true)
		api.updateAvatar(avatarUrl)
		.then((res) => res.json())
		.then(userData => setCurrentUser(userData))
		.catch(err => console.log("Erro ao mudar avatar",err))
		.finally(() => setLoading(false))
	}

	const getCardList = () => {
		setLoading(true)
		api.getInitialCards()
			.then((res) => res.json())
			.then((data) => setCard(data))
			.catch((err) => console.log("Erro ao buscar cards-> ", err))
		.finally(() => setLoading(false))
	}

	const handleAddPlaceSubmit = (card) => {
		setLoading(true)
		api.createCard(card)
		.then((res) => res.json())
		.then((newCard) => setCard((prevCards) => [newCard, ...prevCards]))
		.catch(err => console.log("Erro ao criar card ",err))
		.finally(() => setLoading(false))
	}

	const handleCardLike = (card) => {
		const likeRequest = card.isLiked ? api.removeLike(card._id) : api.addLike(card._id);

		likeRequest
			.then((updatedCard) => {
				setCard((prevCards) =>
					prevCards.map((c) =>
						c._id === card._id ? { ...c, ...updatedCard, isLiked: !card.isLiked } : c
					)
				);
			})
			.catch((err) => {
				console.error('Erro ao atualizar like:', err);
			});
	}

	const handleCardDelete = (card) => {
		setLoading(true)
		api.deleteCard(card._id)
			.then(() => {
				setCard((prevCards) => prevCards.filter((c) => c._id !== card._id));
				setPopup(null)
			})
			.catch((err) => {
				console.log("Erro ao deletar card", err)
				setPopup(null)
			})
			.finally(() => setLoading(false))
		
	}

	return (
		<div className="page">
			<CurrentUserContext.Provider value={{currentUser,handleUpdateUser, handleUpdateAvatar}}>
				<Header />
				<Routes>
					<Route path="/" element={
						<Main onCardLike={handleCardLike} 
						onCardDelete={handleCardDelete} 
						getCardList={getCardList}
						onAddPlaceSubmit={handleAddPlaceSubmit}
						cardState={card} 
						popupState={popup} 
						setPopupState={setPopup}
						isLoading={isLoading}/>
					} />
					<Route path="/signup" element={
						<Register />
					}/>
					<Route path="/signin" element={
						<Login />
					} />
				</Routes>
				<Footer />
			</CurrentUserContext.Provider>
		</div>
	)
}

export default App
