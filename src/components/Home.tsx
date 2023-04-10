import home from "../assets/home.jpg";
import HomeContent from "./HomeContent";
import GoogleLogin from "./common/GoogleLogin";

const Home = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${home})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <HomeContent />
          <GoogleLogin label="Get Started" />
        </div>
      </div>
    </div>
  );
};

export default Home;
