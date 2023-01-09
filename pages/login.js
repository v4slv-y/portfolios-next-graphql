import LogInForm from "../components/forms/LogInForm";
import { GET_USER, SING_IN } from "../apollo/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [mutationFunc, { data, loading, error }] = useMutation(SING_IN, {
    update(cache, { data: { singIn: singedUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: singedUser },
      });
    },
  });

  const newLogInData = (loginData) => {
    mutationFunc({ variables: loginData })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err.message));
    router.push("/");
  };

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            <LogInForm ldng={loading} getLogInData={newLogInData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
