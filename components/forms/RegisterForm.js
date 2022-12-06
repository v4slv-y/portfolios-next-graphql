import { useForm } from "react-hook-form";

const RegisterForm = ({ onSubmit }) => {
  //   const [form, setForm] = useState({});

  //   const handleChange = (e) => {
  //     console.log(e.target.name);
  //     console.log(e.target.value);
  //     const { name, value } = e.target;
  //     setForm({
  //       ...form,
  //       [name]: value,
  //     });
  //   };

  const { register, handleSubmit } = useForm();

  return (
    // <form onSubmit={() => onSubmit(form)}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          //   onChange={handleChange}
          {...register("avatar", { required: true })}
          type="text"
          className="form-control"
          name="avatar"
          id="avatar"
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          //   onChange={handleChange}
          {...register("username", { required: true })}
          type="text"
          className="form-control"
          name="username"
          id="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          //   onChange={handleChange}
          {...register("email", { required: true })}
          type="email"
          className="form-control"
          name="email"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          //   onChange={handleChange}
          {...register("password", { required: true })}
          type="password"
          className="form-control"
          name="password"
          id="password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password confirmation</label>
        <input
          //   onChange={handleChange}
          {...register("passwordConfirmation", { required: true })}
          type="password"
          className="form-control"
          name="passwordConfirmation"
          id="passwordConfirmation"
        />
      </div>
      <button type="submit" className="btn btn-main bg-blue py-2 ttu">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
