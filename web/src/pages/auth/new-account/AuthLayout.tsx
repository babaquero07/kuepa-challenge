import NewAccountPage from "./NewAccountPage";

const AuthLayout = () => {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">
        <NewAccountPage />
      </div>
    </main>
  );
};

export default AuthLayout;
