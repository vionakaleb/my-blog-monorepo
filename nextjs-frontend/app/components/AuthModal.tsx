export const AuthModal = ({ isOpen, mode, onClose, onSubmit }) => {
  const isLogin = mode === "login";
  
  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl mb-5 border-b-4 border-primary pb-2">
          {isLogin ? "Sign In" : "Create Account"}
        </h3>
        <form onSubmit={onSubmit}>
          <div className="form-control space-y-4">
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered"
                required
              />
            </div>
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="••••••••"
                  className="input input-bordered"
                  required
                />
              </div>
            )}
            <div className="modal-action mt-6">
              <button type="submit" className="btn btn-primary w-full">
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
