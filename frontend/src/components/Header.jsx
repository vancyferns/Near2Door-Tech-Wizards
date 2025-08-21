import React, { useState } from "react";
import Header from "./Header";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";

export const AppContext = React.createContext();

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const onNavigate = ({ name }) => {
    setCurrentPage(name);
  };

  return (
    <AppContext.Provider value={{}}>
      <div className="min-h-screen flex flex-col">
        {/* Header is always visible */}
        <Header onNavigate={onNavigate} />

        {/* Page content changes */}
        <main className="flex-1">
          {currentPage === "home" && <HomePage />}
          {currentPage === "about" && <AboutUsPage />}
        </main>
      </div>
    </AppContext.Provider>
  );
}
