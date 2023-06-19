import { useRef, useState } from "react";

import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

// let data;

function UserProfile(props) {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();
  const [isValidInput, setIsValidInput] = useState(true);
  const [message, setMessage] = useState("");
  //const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    setIsValidInput(true);
    //setIsLoading(true);

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    if (
      !enteredNewPassword ||
      enteredNewPassword.length < 7 ||
      !enteredOldPassword ||
      enteredOldPassword.length < 7
    ) {
      setIsValidInput(false);
      //setIsLoading(false);
      return;
    }
    //setIsLoading(true);
    const passwordData = {
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    };

    const response = await fetch("/api/auth/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setMessage(data.message);
  }

  return (
    <div className="profilePage">
      <form onSubmit={submitHandler}>
        <div className="title">
          <h1>Your User Profile </h1>
          <p>({props.session.user.email})</p>
        </div>
        <div>
          <label htmlFor="old-password">Old Password</label>
          <input type="password" id="old-password" ref={oldPasswordRef} />
        </div>
        <div>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={newPasswordRef} />
        </div>

        {!isValidInput && <p className="info">Invalid input</p>}
        {message && (
          <p className={message.includes("updated") ? "info success" : "info"}>
            {message}
          </p>
        )}
        <div>
          <button className="callToAction">Change Password</button>
        </div>
      </form>
      {/* <ProfileForm /> */}
    </div>
  );
}

export default UserProfile;
