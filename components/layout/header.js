import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const isMobileDevice = useWindowSize();

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  function logoutHandler() {
    signOut();
    setShowMenu(!showMenu);
    router.push("/");
  }

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <header>
      <div className="container">
        <div className="left">
          <Link href="/" className="logo">
            <p>DCA TRACKER</p>
          </Link>
        </div>
        <div className="right">
          <nav>
            <div className="hamburger" onClick={toggleMenu}>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
              >
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
            </div>
            {showMenu && (
              <div className="mobileLinks">
                <ul>
                  <li>
                    <Link href="/what-is-dca" onClick={toggleMenu}>
                      What is DCA?{" "}
                    </Link>
                  </li>
                  <li>
                    <Link href="/donate" onClick={toggleMenu}>
                      Support us
                    </Link>
                  </li>
                  {session && (
                    <li>
                      <Link href="/profile" onClick={toggleMenu}>
                        Profile
                      </Link>
                    </li>
                  )}
                  {!session && !loading && (
                    <li>
                      <Link
                        className="login"
                        href="/login"
                        onClick={toggleMenu}
                      >
                        Login{" "}
                      </Link>
                    </li>
                  )}

                  {session && (
                    <li>
                      <button className="logout" onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>
                  )}
                  <li>
                    <Link href="/track-investments" className="callToAction">
                      Start tracking
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {/* <div className={classes.image}>
          <Image src="/BTC 1.png" height={40} width={40} alt="Bitcoin" />
        </div> */}
            <ul className="navItems">
              <li>
                <Link href="/what-is-dca">What is DCA? </Link>
              </li>
              <li>
                <Link href="/donate">Support us</Link>
              </li>
              {session && (
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
              )}
              {!session && !loading && (
                <li>
                  <Link className="login" href="/login">
                    Login{" "}
                  </Link>
                </li>
              )}

              {session && (
                <li>
                  <button className="logout" onClick={logoutHandler}>
                    Logout
                  </button>
                </li>
              )}
              <li>
                <Link href="/track-investments" className="callToAction">
                  Start tracking
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
