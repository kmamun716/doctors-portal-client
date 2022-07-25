import React from "react";

const ResetPassword = () => {
  const handleChange = (e) => {};
  const handleSubmit = (e) => {};
  return (
    <div>
      <input type="checkbox" id="reset-password-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="reset-password-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-center text-secondary">
            Password Reset
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 justify-items-center my-2"
          >
            <input
              type="email"
              onChange={handleChange}
              placeholder="Your Registered Email"
              name="email"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-secondary w-full max-w-xs text-white uppercase"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
