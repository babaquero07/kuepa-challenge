import LoginForm from "./ui/LoginForm";

const NewAccountPage = () => {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className="text-4xl mb-5">Login</h1>

      <LoginForm />
    </div>
  );
};

export default NewAccountPage;
