import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar'; 
import Home from './pages/Home';     
import Login from './pages/Login';
import Signup from './pages/Signup';
import Moreinfo from './pages/Moreinfo';
import Qnsec1 from './pages/Qnsec1'
import Qnsec2 from './pages/Qnsec2'
import Resultspage from './pages/Resultspage';
import Joblisting from './pages/Joblisting';
import ChoosingPage from './pages/ChoosingPage';
import Profilepage from './pages/Profilepage';
import Aboutuspage from './pages/Aboutuspage';
import Privacypolicypage from './pages/Privacypolicypage';
import Termspage from './pages/Termspage';
import Contactuspage from './pages/Contactuspage';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Root Route */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/moreinfo" element={<Moreinfo />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/Moreinfo" element={<Moreinfo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Qnsec1" element={<Qnsec1 />} />
        <Route path="/Qnsec2" element={<Qnsec2 />} />
        <Route path="/Resultspage" element={<Resultspage />} />
        <Route path="/Joblisting" element={<Joblisting />} />
        <Route path="/ChoosingPage" element={<ChoosingPage />} />
        <Route path="/Aboutuspage" element={<Aboutuspage />} />
        <Route path="/Profilepage" element={<Profilepage />} />
        <Route path="/Aboutuspage" element={<Aboutuspage />} />
        <Route path="/Privacypolicypage" element={<Privacypolicypage />} />
        <Route path="/Termspage" element={<Termspage />} />
        <Route path="/Contactuspage" element={<Contactuspage />} />




      </Routes>
    </Router>
  );
}

export default App;
