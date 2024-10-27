const Middle = () => {
  return (
    <div className="relative h-[512px] bg-cover bg-center">
      {/* Mobile background */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:hidden"
        style={{ backgroundImage: `url('/Img/home/123.png')` }}
      ></div>

      {/* Tablet background */}
      <div
        className="absolute inset-0 hidden sm:block md:hidden bg-cover bg-center"
        style={{ backgroundImage: `url('/Img/home/middbanner.png')` }}
      ></div>

      {/* Desktop background */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url('/Img/home/middbanner.png')` }}
      ></div>

      {/* Overlay for darkening effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content Section */}
      <div className="relative z-10 flex items-center justify-start px-4 sm:px-12 md:px-24 h-full">
        <div className="text-left text-white space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            YOUR DREAM, OUR STAGE
          </h1>
          <p className="text-sm sm:text-md md:text-lg">
            Wonchance partners with renowned production houses for <br />
            exceptional collaborations.
          </p>
          <button className="mt-6 px-6 py-2 sm:px-8 sm:py-3 border border-white text-white text-md sm:text-lg rounded hover:bg-white hover:text-black transition">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Middle;
