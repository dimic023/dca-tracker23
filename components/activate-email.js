import classes from "./activate-email.module.css";
import Link from "next/link";

function ActivateEmail() {
  return (
    <section className={classes.section}>
      <p>
        An activation email has been sent to you, please follow the link from
        your email to activate your account.
      </p>
      <Link href="/login">Login</Link>
    </section>
  );
}

export default ActivateEmail;
