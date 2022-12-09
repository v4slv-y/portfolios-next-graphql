import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useLazyGetUser } from "../../apollo/actions";
import { useEffect, useState } from "react";

const AppLink = ({ children, className, href }) => (
  <Link legacyBehavior href={href}>
    <a className={className}>{children}</a>
  </Link>
);

// legacyBehavior

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
    console.log("NavBar log User: ", user);
  }, []);

  if (data) {
    if (data.user && !user) setUser(data.user);
    if (!data.user && user) setUser(null);
    if (!hasResponse) setHasResponse(true);
  }

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className=" navbar-dark fj-mw9">
        <AppLink href={"/"} className="navbar-brand mr-3 font-weight-bold">
          Your Portfolio
        </AppLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink href="/portfolios" className="nav-link mr-3">
              Portfolios
            </AppLink>
            <AppLink href={"/forum/categories"} className="nav-link mr-3">
              Forum
            </AppLink>
            <AppLink href={"/cv"} className="nav-link mr-3">
              Cv
            </AppLink>
          </Nav>
          {hasResponse && (
            <Nav>
              {user && (
                <>
                  <span className="nav-link mr-2">Welcome {user.username}</span>
                  <NavDropdown
                    className="mr-2"
                    title="Manage"
                    id="basic-nav-dropdown"
                  >
                    {(user.role === "admin" || user.role === "admin") && (
                      <AppLink href="/portfolios/new" className="dropdown-item">
                        Create Portfolio
                      </AppLink>
                    )}
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                  <AppLink href={"/logout"} className="nav-link btn btn-danger">
                    Sing Out
                  </AppLink>
                </>
              )}
              {(error || !user) && (
                <>
                  <AppLink href={"/login"} className="mr-3 nav-link">
                    Sing In
                  </AppLink>
                  <AppLink
                    href={"/register"}
                    className="mr-3 btn btn-success bg-green-2 bright"
                  >
                    Sing Up
                  </AppLink>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
