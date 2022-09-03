import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Navmenu() {
  const { user, setUser } = useContext(UserContext);
  let history = useNavigate();
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <img
            src="http://www.360rf.in/sites/default/files/inline-images/Project%20management.gif"
            className="img-fluid"
            style={{ height: "100px" }}
          ></img>
          <h2 style={{alignItems:"center"}}>PROJECT MANAGEMENT TOOL</h2>
        </div>
        <div className="d-flex align-items-center">
          <div
            className="d-flex align-items-end flex-column bd-highlight mb-3"
            style={{ height: "150px" }}
          >
            <div className="p-2 bd-highlight">
              <img src="https://www.ntaskmanager.com/wp-content/uploads/2019/07/project-management-is-a-by-product-of-focused-hard-work.jpg"

                alt={user.data.name}
                style={{ width: "200px", height: "80px" }}
              />
            </div>
            <div className="p-2 bd-highlight">
              {user ? (
                <button
                  onClick={() => {
                    setUser();
                    history("/");
                    localStorage.removeItem("admin");
    
                    
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  LogOut
                </button>
              ) : (
                <button
                  onClick={async () => {
                    history("/home");
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  LogIn
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >

            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/Project-list">
                  <a className="nav-link ">Project</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/Requirement">
                  <a className="nav-link ">Requirement</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/Issues">
                  <a className="nav-link ">Issues</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/Label">
                  <a className="nav-link ">Labels</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about">
                  <a className="nav-link" href="/about">
                    About
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navmenu;
