import { useRef, useState } from "react";

function ProfileForm(props) {
  const newPasswordRef = useRef();
  const oldPasswordRef = useRef();
  const [isValidInput, setIsValidInput] = useState(true);
  const [message, setMessage] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    setIsValidInput(true);

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    if (
      !enteredNewPassword ||
      enteredNewPassword.length < 7 ||
      !enteredOldPassword ||
      enteredOldPassword.length < 7
    ) {
      setIsValidInput(false);
      return;
    }

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
    <form onSubmit={submitHandler}>
      <div className="title">
        <h1>Your User Profile </h1>
        <h2>({props.session.user.email})</h2>
      </div>
      <div>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>

      {!isValidInput && <p>Invalid input</p>}
      {message && <p>{message}</p>}
      <div>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
