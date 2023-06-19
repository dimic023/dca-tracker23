import { Fragment } from "react";
import Layout from "../components/layout/layout";
import "/styles/styles.scss";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Fragment>
  );
}

export default MyApp;
