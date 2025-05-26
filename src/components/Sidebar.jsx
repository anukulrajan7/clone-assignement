import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFire,
  faGamepad,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { label: "Home", icon: faHome, href: "/" },
  { label: "Trending", icon: faFire, href: "/trending" },
  { label: "Gaming", icon: faGamepad, href: "/gaming" },
  { label: "Saved Videos", icon: faSave, href: "/saved" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {isOpen && (
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}

        <nav className="nav-links">
          {navItems.map(({ label, icon, href }) => (
            <Link
              key={label}
              to={href}
              className={`nav-item ${isActive(href) ? "active" : ""}`}
              onClick={() => {
                if (window.innerWidth <= 768) toggleSidebar();
              }}
            >
              <FontAwesomeIcon
                icon={icon}
                className={`nav-icon ${isActive(href) ? "active-icon" : ""}`}
              />
              {label}
            </Link>
          ))}
        </nav>

        {!isOpen && (
          <div className="contact">
            <p className="font-bold mb-2 text-left">CONTACT US:</p>
            <div className="social-icons flex gap-3 mb-2">
              <img
                src="img/nxt-watch-facebook-logo-img.png"
                alt="Facebook"
                className="w-6 h-6"
              />
              <img
                src="img/nxt-watch-twitter-logo-img.png"
                alt="Twitter"
                className="w-6 h-6"
              />
              <img
                src="img/nxt-watch-linked-in-logo-img.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </div>
            <p className="text-sm">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
