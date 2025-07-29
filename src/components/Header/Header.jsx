import logo from '../../images/logo.png'
import { useLocation, Link } from 'react-router-dom'

function Header({handleLogout,userEmail}) {

  const location = useLocation()

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

 console.log(userEmail)
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="logo do website" />
        {location.pathname === '/' ? (
         <div className="header__info-wrapper">
          <p className="header__email">{userEmail}</p>
           <button className="header__btn-logout" onClick={handleLogout}>{btnText}</button>
         </div>
        ) : (
          <Link className="header__btn" to={btnHref}>{btnText}</Link>
        )}
       
      </header>
    </>
  );
}

export default Header
