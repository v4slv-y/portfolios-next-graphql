import { useGetUser } from "../apollo/actions";
import { useRouter } from "next/router";

export default (WrappedComponent, role) => (props) => {
  console.log("pros in WrappedCOmponent: ", props);
  const router = useRouter();
  const {
    data: { user } = {},
    loading,
    error,
  } = useGetUser({ fetchPolicy: "network-only" });

  if (!loading && (!user || error) && typeof window !== "undefined")
    router.push("/login");

  if (user) {
    if (role && !role.includes(user.role)) {
      router.push("/login");
    }
    return <WrappedComponent {...props} />;
  }

  return <p>Authenticating...</p>;
};
