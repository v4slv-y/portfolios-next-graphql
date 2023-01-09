import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useLazyGetUser } from "../../apollo/actions";
import { useEffect, useState } from "react";

const AppLink = ({ children, className, href, as }) => {
  return (
    <Link legacyBehavior href={href} as={as}>
      <a className={className}>{children}</a>
    </Link>
  );
};

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
                  {console.log(user)}
                  <span className="nav-link mr-2">Welcome {user.username}</span>
                  <NavDropdown
                    className="mr-2"
                    title="Manage"
                    id="basic-nav-dropdown"
                  >
                    {(user.role === "admin" || user.role === "instructor") && (
                      <>
                        <AppLink
                          href="/portfolios/new"
                          className="dropdown-item"
                        >
                          Create Portfolio
                        </AppLink>
                        <AppLink
                          href="/instructor/[id]/dboard"
                          as={`/instructor/${user._id}/dboard`}
                          className="dropdown-item"
                        >
                          DashBoard
                        </AppLink>
                      </>
                    )}
                  </NavDropdown>
                  <AppLink href={"/logout"} className="nav-link btn btn-danger">
                    Sing Out
                  </AppLink>
                </>
              )}
              {(error || !user) && (
                <>
                  {error && alert(error)}
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
