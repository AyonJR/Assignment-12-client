import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Header = () => {
  return (
    <div>
      <div className="h-[80px] bg-cyanCustom">
        <div className="flex gap-10 mx-20 font-semibold text-white items-center">
          {/* Contact Section */}
          <div className="flex items-center gap-2 mt-7">
            <FaPhoneAlt className="" /> {/* Phone Icon */}
            <h2>+880 1876127391</h2>
          </div>

          {/* Email Section */}
          <div className="flex items-center gap-2 mt-7">
            <FaEnvelope className="" /> {/* Mail Icon */}
            <h2> LabXbd@gmail.com</h2>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 ml-auto mt-7">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
