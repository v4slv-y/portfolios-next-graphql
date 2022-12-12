import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

const PortfolioForm = ({ onSubmit, initialData = {} }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    register("startDate");
    register("endDate");
  }, [register]);

  useEffect(() => {
    const { startDate, endDate } = initialData;
    if (startDate) setStartDate(new Date(parseInt(startDate, 10)));
    if (endDate) setEndDate(new Date(parseInt(endDate, 10)));
  }, [initialData]);

  const handleStartDate = (date) => {
    setValue(
      "startDate",
      (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date
    );
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setValue(
      "endDate",
      (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date
    );
    setEndDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          {...register("title", { required: true })}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
          {...register("company", { required: true })}
          name="company"
          type="text"
          className="form-control"
          id="company"
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">Company Website</label>
        <input
          {...register("companyWebsite", { required: true })}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"
        />
      </div>
      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          {...register("location", { required: true })}
          name="location"
          type="text"
          className="form-control"
          id="location"
        />
      </div>
      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          {...register("jobTitle", { required: true })}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          {...register("description", { required: true })}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="street">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={handleStartDate}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="street">End Date</label>
        <div>
          <DatePicker
            showYearDropdown
            disabled={!endDate}
            selected={endDate}
            onChange={handleEndDate}
          />
        </div>
      </div>
      <div className="form-group">
        {endDate && (
          <button
            onClick={() => handleEndDate(null)}
            type="button"
            className="btn btn-danger"
          >
            No End Date
          </button>
        )}
        {!endDate && (
          <button
            onClick={() => handleEndDate(new Date())}
            type="button"
            className="btn btn-success"
          >
            Set End Date
          </button>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default PortfolioForm;
