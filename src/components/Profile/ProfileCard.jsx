export default function ProfileHeader() {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <img
          src="https://pbs.twimg.com/profile_images/1726295161700048896/e7nrUUfX_400x400.jpg"
          alt="Tatiana Kallmann"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Tatiana Kallmann</h1>
          <p className="text-gray-600">
            Actor exploring the world of cinema. Follow along for
            behind-the-scenes content!
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <span className="font-semibold">Gender:</span> <span>Female</span>
            <span className="font-semibold">Age:</span> <span>27</span>
            <span className="font-semibold">Experience:</span>
            <span>2 Years</span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <span className="font-semibold">Nationality:</span> <span>Brazil</span>
            <span className="font-semibold">Current Place:</span>{" "}
            <span>Los Angeles</span>
          </div>
        </div>
      </div>
    );
  }
  