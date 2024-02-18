import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center my-6">
      Developed by
      <a
        href="https://github.com/babaquero07"
        target="_blank"
        className="ml-1 flex justify-center text-bold items-center gap-1 hover:underline hover:text-violet-900"
      >
        @babaquero07 <FaGithub />
      </a>
    </footer>
  );
};

export default Footer;
