import logo from '../../images/logo.png'
import { useLocation, Link } from 'react-router-dom'
import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext.js'

function Header({handleLogout}) {

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
    btnText = 'Sair';
  }


  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="logo do website" />
        {location.pathname === '/' ? (
          <button className="header__btn-logout" onClick={handleLogout}>{btnText}</button>
        ) : (
          <Link className="header__btn" to={btnHref}>{btnText}</Link>
        )}
      </header>
    </>
  );
}

export default Header
