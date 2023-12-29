import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Ana Sayfa</Link>
            </li>
            <li>
              <Link to="/signin">Giriş Yap</Link>
            </li>
            <li>
              <Link to="/signup">Kayıt Ol</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/signin"
          element ={<SignIn />}>            
          </Route>
          <Route path="/signup"
          element ={<SignUp />}>            
          </Route>
          <Route path="/"
          element={<Home />}>            
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

