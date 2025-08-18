import { NavLink, Outlet } from 'react-router-dom';
import '../css/RootLayout.css';
import rainAudio from '../assets/Rain-audio.mp3'

const RootLayout = () => {
    return (
        <div className="lead-container">
            <header>
                <nav className="nav-bar">
                    <NavLink to="/"             className="nav-link" >Home</NavLink>
                    <NavLink to="/spacecraft"   className="nav-link" >Spacecraft</NavLink>
                    <NavLink to="/planets"      className="nav-link" >Planets</NavLink>
                </nav>
                <div className="header">Space Travel : Expanding Horizons Beyond Earth</div>
            </header>

            <main className="sub-container">
                <Outlet />
            </main>

            <footer className="footer">
                The solar system : the new home.
                <audio autoPlay loop>
                    <source src={rainAudio} type="audio/mpeg"/>
                </audio>
            </footer>

        </div>
    );
};

export default RootLayout;