import { MdLogout } from "react-icons/md";

import { useAuth } from "../../../context/AuthContext";

const NavBar = () => {
  const auth = useAuth();

  return (
    <>
      <nav className="w-full flex justify-between items-center p-6">
        {auth?.user?.name && (
          <p className="font-bold text-2xl">{`Hi, ${auth?.user.name}. 🖐️`}</p>
        )}

        <button
          onClick={auth?.logout}
          className="btn-secondary p-4 flex justify-center items-center gap-4"
        >
          <MdLogout />
          Logout
        </button>
      </nav>
      {/* divisor line */}
      <div className="flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
    </>
  );
};

export default NavBar;
