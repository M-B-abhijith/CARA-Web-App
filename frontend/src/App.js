import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar'; 
import Home from './pages/Home';     
import Login from './pages/Login';
import Signup from './pages/Signup';
import Moreinfo from './pages/Moreinfo';
import Qnsec1 from './pages/Qnsec1';
import Qnsec2 from './pages/Qnsec2';
import Resultspage from './pages/Resultspage';
import Joblisting from './pages/Joblisting';
import ChoosingPage from './pages/ChoosingPage';
import Profilepage from './pages/Profilepage';
import Aboutuspage from './pages/Aboutuspage';
import Privacypolicypage from './pages/Privacypolicypage';
import Termspage from './pages/Termspage';
import Contactuspage from './pages/Contactuspage';
import ProfileForm from './pages/Profileformpage';
import CareerForm from './pages/Careerformpage';
import JobFormPage from './pages/jobformpage';
import RoadmapPage from './pages/RoadmapPage';
import Dashboardpage from './pages/Dashboardpage';
import Jobsscrapped from './pages/JobScrape';

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [pathname]); // Trigger on every route change

  return null; // This component doesn't render anything
}

const AppContent = () => {
  const location = useLocation(); // Get the current route location

  // Define pages where the UserButton should not appear
  const noUserButtonPages = ['/', '/login', '/signup'];

  return (
    <>
      {/* Conditionally render UserButton inside Navbar */}
      <Navbar showUserButton={!noUserButtonPages.includes(location.pathname)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/moreinfo/:careerTitle" element={<Moreinfo />} />
        <Route path="/Qnsec1" element={<Qnsec1 />} />
        <Route path="/Qnsec2" element={<Qnsec2 />} />
        <Route path="/Resultspage" element={<Resultspage />} />
        <Route path="/Joblisting" element={<Joblisting />} />
        <Route path="/ChoosingPage" element={<ChoosingPage />} />
        <Route path="/Aboutuspage" element={<Aboutuspage />} />
        <Route path="/Profilepage" element={<Profilepage />} />
        <Route path="/Privacypolicypage" element={<Privacypolicypage />} />
        <Route path="/Termspage" element={<Termspage />} />
        <Route path="/Contactuspage" element={<Contactuspage />} />
        <Route path="/ProfileForm" element={<ProfileForm />} />
        <Route path="/Dashboardpage" element={<Dashboardpage />} />
        <Route path="/CareerForm" element={<CareerForm />} />
        <Route path="/JobFormPage" element={<JobFormPage />} />
        <Route path="/RoadmapPage" element={<RoadmapPage />} />
        <Route path="/Jobsscrapped" element={<Jobsscrapped />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <AppContent />
    </Router>
  );
}

export default App;