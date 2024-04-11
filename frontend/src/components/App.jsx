import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar'
import Home from './Home'
// import Login from './Login'
// import Signup from './Signup'
import Passgen from './Passgen'
import Passwords from './Passwords'
import Createpass from './Createpass'
import Editpass from './Editpass'
import '../assets/index.css'
// {/* <NavBar /> */}
/* <Route path="/" element={< Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
<Route path="/login" element={< Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
<Route path="/signup" element={< Signup setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
<Route path="/passwordGenerator" element={< PasswordGenerator />} /> */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* email={ email } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn }  */}
          <Route path = '/' element = { <Home /> } />
          {/* <Route path='/login' element={<Login />} email={ email } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn }  /> */}
          {/* <Route path='/signup' element={<Signup />} email={ email } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } setEmail={ setEmail } /> */}
          <Route path = '/passgen' element = { <Passgen /> } />
          <Route path = '/create_pass' element = { <Createpass /> } />
          <Route path = '/edit_pass' element = { <Editpass /> } />
          <Route path = '/passwords' element = { <Passwords /> } />
          {/* /passwords will be the main page for the CRUD operations
              the create function will be a popup
              the edit and delete will be buttons in a table
              table will have web_name, web_pass, edit button, and delete button 
          */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App