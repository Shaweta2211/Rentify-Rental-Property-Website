

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import LandingPage from './components/LandingPage';
// import RegisterForm from './components/RegisterForm';
// import LoginForm from './components/LoginForm';
// import ResetPasswordForm from './components/ResetPasswordForm';
// import RentProperty from './components/RentProperty';
// import ListProperty from './components/ListProperty';
// import UserProfile from './components/UserProfile';
// import AboutUs from './components/AboutUs';
// import ContactUs from './components/ContactUs';
// import Privacy  from './components/Privacy';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <Router>
//       <div>
//         <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//         <Routes>
//           <Route path='/login' element={<LoginForm />} />
//           <Route path="/" element={isLoggedIn ? <LandingPage /> : <LoginForm onLogin={handleLogin} />} />
//           <Route path="/register" element={<RegisterForm />} />
//           <Route path="/rent-property" element={<RentProperty />} />
//           <Route path="/list-property" element={isLoggedIn ? <ListProperty /> : <ListProperty onLogin={handleLogin} />} />
//           <Route path="/profile" element={<UserProfile />} />
//           <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
//           <Route path="/about-us" element={<AboutUs />} /> {/* About Us Route */}
//           <Route path="/contact-us" element={<ContactUs />} /> {/* Contact Us Route */}
//           <Route path="/privacy" element={<Privacy />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;

// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import RentProperty from './components/RentProperty';
import ListProperty from './components/ListProperty';
import UserProfile from './components/UserProfile';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Privacy from './components/Privacy';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <LandingPage /> : <LoginForm onLogin={handleLogin} />}
        />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route path="/rent-property" element={<RentProperty />} />
        <Route
          path="/list-property"
          element={isLoggedIn ? <ListProperty /> : <LoginForm onLogin={handleLogin} />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <UserProfile /> : <LoginForm onLogin={handleLogin} />}
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
