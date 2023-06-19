import { getServerSession } from "next-auth";
import UserProfile from "../components/profile/user-profile";
import { useSession, getSession } from "next-auth/react";

function ProfilePage(props) {
  return <UserProfile session={props.session} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
