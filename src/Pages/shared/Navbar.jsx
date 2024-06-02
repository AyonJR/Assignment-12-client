import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
<div className="navbar fixed z-50 bg-opacity-0 bg-black text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className=" text-3xl font-bold">Lab<span className="text-blue-400 ">X</span></a>
  </div>
  <div className="navbar-center hidden mt-5 lg:flex">
    <ul className="menu menu-horizontal px-1 text-lg">
    <Link to={'/allTest'}>
      <li className="mr-5">
       AllTest
      </li></Link>      
      <Link to={'/login'}>
      <li className="mr-5">
       Login
      </li></Link>
      
      <Link to={'/register'}>
      <li>Register</li>
    </Link>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn bg-opacity-0 outline-none border-opacity-0 text-white">Button</a>
  </div>
</div>        </div>
    );
};

export default Navbar;