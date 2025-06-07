
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Hero from "./Hero";
import Features from "./Features";
import AboutContact from "./AboutContact";
import PackagesSection from "./Packages";

const Home = ({ sidebarOpen, toggleSidebar, closeSidebar }) => {
  return (
    <> 
       
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      {sidebarOpen && <div className="backdrop" onClick={closeSidebar}></div>}
      <Hero />
      <Features />
      <PackagesSection/>
      <AboutContact />
    </>
  );
};

export default Home;
