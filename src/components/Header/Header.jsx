import logo from '../../images/logo.png'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'

function Header() {

  const location = useLocation()
  const { currentUser } = useContext(CurrentUserContext)

  let btnText = '';
  let btnHref = '';

  if(location.pathname === "/signup"){
    btnText = 'Faça login';
    btnHref = '/signin'
  } else if( location.pathname === '/signin'){
    btnText = 'Cadastre-se';
    btnHref = '/signup'
  } else if(location.pathname === '/'){
    btnText = currentUser.email || 'email not found';
    btnHref = "#"
  }


  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="logo do website" />
        <a className="header__btn" href={btnHref}>{btnText}</a>
      </header>
    </>
  );
}

export default Header
