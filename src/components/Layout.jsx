import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "../context/ThemeContext";
import { VideoInteractionProvider } from "../context/VideoActionContext";
const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <VideoInteractionProvider>
          <div className="main" style={{ display: "flex", flex: 1 }}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            {children}
          </div>
        </VideoInteractionProvider>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
