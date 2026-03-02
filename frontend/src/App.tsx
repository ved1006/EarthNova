import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpaceProvider } from './context/SpaceContext';
import Layout from './components/Common/Layout';
import Hero from './components/Hero/Hero';
import SkyEvents from './components/SkyEvents/SkyEvents';
import Weather from './components/Weather/Weather';
import Timeline from './components/Timeline/Timeline';
import SatelliteSection from './components/Earth/EarthSection';
import LearningZone, { FinalCTA } from './components/Learning/LearningZone';

// Pages
import EventsPage from './components/Events/EventsPage';
import WeatherPage from './components/Weather/WeatherPage';
import MissionsPage from './components/Timeline/MissionsPage';
import ImpactPage from './components/Earth/ImpactPage';
import DashboardPage from './components/Dashboard/DashboardPage';

function Home() {
  return (
    <>
      <Hero />
      <SkyEvents />
      <Weather />
      <Timeline />
      <SatelliteSection />
      <LearningZone />
      <FinalCTA />
    </>
  );
}

function App() {
  return (
    <SpaceProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Layout>
      </Router>
    </SpaceProvider>
  );
}

export default App;
