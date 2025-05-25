import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faUserCircle,
  faBars,
  faTimes,
  faRightFromBracket,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { removeUserCredential } from "../hooks/useAuth";

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUserCredential();
    navigate("/login");
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-container">
        <img
          src={`${
            isDarkMode
              ? "img/nxt-watch-logo-dark-theme-img.png"
              : "img/nxt-watch-logo-light-theme-img.png"
          }`}
          className="logo"
          alt="NXT Watch Logo"
        />
      </div>

      {/* Actions Section */}
      <div className="actions">
        <button
          className="icon-btn theme-toggle"
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>

        <button className="icon-btn exit-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>

        <button className="icon-btn user-btn">
          <FontAwesomeIcon icon={faUserCircle} style={{ color: "#406694" }} />
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
