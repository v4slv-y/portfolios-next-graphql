// import LogInForm from "../components/forms/LogInForm";
// import { GET_USER, SING_IN } from "../apollo/queries";
// import { useMutation } from "@apollo/client";
// import { useRouter } from "next/router";

import { useSingOut } from "../apollo/actions";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = ({ apollo }) => {
  //   const router = useRouter();
  //   const [mutationFunc] = useMutation(SING_IN, {
  //     update(cache, { data: { singIn: singedUser } }) {
  //       cache.writeQuery({
  //         query: GET_USER,
  //         data: { user: singedUser },
  //       });
  //     },
  //   });

  //   const newLogInData = (loginData) => {
  //     mutationFunc({ variables: loginData })
  //       .then((resp) => console.log(resp))
  //       .catch((err) => console.log(err.message));
  //     router.push("/");
  //   };

  const [singOut] = useSingOut();
  const router = useRouter();

  useEffect(() => {
    singOut();
    router.push("/login");
  }, []);

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Logout</h1>
            <p>Singing uot...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
