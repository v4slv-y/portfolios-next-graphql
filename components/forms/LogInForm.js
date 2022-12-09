import { useForm } from "react-hook-form";

const LogInForm = ({ getLogInData, loading }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(getLogInData)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", { required: true })}
          name="email"
          type="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          {...register("password", { require: true })}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      {loading && "Singing in..."}
      {!loading && (
        <button type="submit" className="btn btn-main bg-blue py-2 ttu">
          Submit
        </button>
      )}
    </form>
  );
};

export default LogInForm;
