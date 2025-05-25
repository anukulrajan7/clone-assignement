import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "../context/ThemeContext";
const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main" style={{ display: "flex", flex: 1 }}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
