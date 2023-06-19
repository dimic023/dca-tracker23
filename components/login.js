import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isValidCredentials, setIsValidCredentials] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    setIsValidCredentials(true);
  }

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setUserExists(false);
    setIsValidCredentials(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (result.error) {
        setIsLoading(false);
        setIsValidCredentials(false);
      }

      if (!result.error) {
        router.replace("/");
      }
    } else {
      try {
        setIsLoading(true);
        const result = await createUser(enteredEmail, enteredPassword);
        const res = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
        router.replace("/activate-email");
      } catch (error) {
        setIsLoading(false);
        setUserExists(true);
        console.log(error);
      }
    }
  }

  return (
    <div className="loginPage">
      <form onSubmit={submitHandler}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <div>
          <div className="top">
            <label htmlFor="email">Your email*</label>
            <p className="info">
              {!isValidCredentials && <p>Enter correct e-mail.</p>}
            </p>
          </div>

          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div>
          <div className="top">
            <label htmlFor="password">Your password*</label>
            <p className="info">
              {!isValidCredentials && <p>Enter correct password.</p>}
            </p>
          </div>

          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div>
          {userExists && <p className="info">User Already Exists</p>}
          {/* {isLoading && <p>Loading...</p>} */}
          <button className={`callToAction ${isLoading ? "spinner" : ""}`}>
            {isLoading ? (
              <div className="spinnerContainer">
                <RingLoader color={"#ffffff"} css={override} size={25} />{" "}
              </div> // Replace `RingLoader` props with your desired configuration
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
          <p className="bottom">
            {isLogin ? "New to DCA Tracker?" : "Already have an account?"}
          </p>
          <p
            className="bottom secondary"
            type="button"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Sign up" : "Login"}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
