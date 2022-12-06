import RegisterForm from "../components/forms/RegisterForm";
import { SING_UP } from "../apollo/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [mutationFunc] = useMutation(SING_UP);
  const register = (data) => {
    mutationFunc({ variables: data })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err.message));
    router.push("/login");
  };

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <RegisterForm onSubmit={register} />
          </div>
        </div>
      </div>
      
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        redirect
      </button>
    </>
  );
};

export default Register;
