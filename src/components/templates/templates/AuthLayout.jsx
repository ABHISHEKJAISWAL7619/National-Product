const AuthLayout = ({ children, banner = "/img/auth-banner-v1.jpg" }) => {
  return (
    <div className="flex h-screen w-full grid-cols-2 flex-col overflow-hidden xl:grid">
      {/* form  */}
      <div className="flex-center mx-auto h-full w-full px-7 md:px-10 lg:px-16 xl:w-[80%] 2xl:w-[75%]">
        <div className="scrollbar-hidden flex h-fit w-full flex-col gap-5 overflow-y-auto md:w-[60%] lg:w-[50%] xl:w-full">
          {children}
        </div>
      </div>

      {/* banner */}
      <img
        src={banner}
        className="hidden h-full max-h-screen w-full object-cover xl:block"
      />
    </div>
  );
};

export default AuthLayout;
