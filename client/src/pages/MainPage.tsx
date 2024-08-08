import backgroundImage from '../assets/DSC_0914.jpg';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center main-page"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <div className="text-center text-white">
                <h1 className="display-1 font-weight-bold mb-4 animate__animated animate__fadeInDown">
                    Welcome to the ultimate SEO tool
                </h1>
                <p className="lead mb-5 animate__animated animate__fadeInUp">
                    Unlock the power of search engine optimization and take your website to new heights.
                </p>
                <Link className="" aria-current="page" to="/comment">
                    <button className="btn btn-outline-light btn-lg animate__animated animate__bounceIn">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MainPage;