import { Link } from 'react-router-dom';

interface HeaderProps {
  text?: string;
}

const Header: React.FC<HeaderProps> = ({
  text = 'BTSeo'
}) => {
  return (
    // <div className="vh-100 overflow-hidden">
      // fixed-top => use margin in App.tsx
      <nav className="navbar navbar-expand-lg border-bottom bg-white sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex justify-content-center align-items-center gap-3" to="/">
            {/* <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" /> */}
            <span className="fs-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              {text}
            </span>
          </Link>

          <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="sidebar offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Bao & Triet SEO</h5>
              <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
              <ul className="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
                <li className="nav-item mx-2">
                  <Link className="nav-link" aria-current="page" to="/comment">
                    Comment
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/profiles">
                    Profiles
                  </Link>
                </li>
              </ul>
              {/* Login / Sign Up */}
              <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3'>
                <a href="" className='text-black px-3 py-1'>Login</a>
                <a href="" className='text-white text-decoration-none px-3 py-1 bg-success rounded-4'>Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    // </div>
  );
};

export default Header;