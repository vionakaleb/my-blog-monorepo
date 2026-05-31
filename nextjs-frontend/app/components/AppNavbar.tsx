export const AppNavbar = ({
  user,
  onLoginClick,
  onSignUpClick,
  onLogoutClick,
}) => (
  <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
    <div className="container mx-auto max-w-5xl">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-bold">MyApp</a>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content">
                <span className="text-lg">{user.name.charAt(0)}</span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">
                <span>{user.name}</span>
              </li>
              <li>
                <a onClick={onLogoutClick}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={onLoginClick}>
              Sign In
            </button>
            <button className="btn btn-primary" onClick={onSignUpClick}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);
