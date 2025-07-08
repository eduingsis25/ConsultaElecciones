import React, { useState } from "react"; // Importa useState
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para cerrar el menú cuando se hace clic en un enlace
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>Registro de votantes</h1>
        {/* Botón de hamburguesa que solo es visible en móvil */}
        <button
          className="hamburger-menu"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* La lista de enlaces: se muestra siempre en desktop, condicionalmente en móvil */}
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        {" "}
        {/* Clase 'open' cuando el menú está activo */}
        <li>
          <Link
            to="/consulta"
            className={location.pathname === "/consulta" ? "active" : ""}
            onClick={closeMenu} // Cierra el menú al hacer clic
          >
            Consulta
          </Link>
        </li>
        <li>
          <Link
            to="/regvoto"
            className={location.pathname === "/regvoto" ? "active" : ""}
            onClick={closeMenu}
          >
            RegVoto
          </Link>
        </li>
        <li>
          <Link
            to="/censo"
            className={location.pathname === "/censo" ? "active" : ""}
            onClick={closeMenu}
          >
            Censo
          </Link>
        </li>
      </ul>
      {/* Overlay que se muestra cuando el menú está abierto para cerrar al hacer clic fuera */}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </nav>
  );
}
