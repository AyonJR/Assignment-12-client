import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "animate.css";
import useTest from "../../CustomHooks/useTest";

const Recommendations = () => {
  const [recommendations] = useTest();

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
     <div className="flex gap-5 items-center mb-6 mx-10">
     <h2 className="text-4xl font-semibold w-1/3  text-black  text-center mb-2">
        Our <span className="text-cyanCustom">Recommendations</span>
      </h2>
      <h2 className="w-2/3 font-semibold border-l-4 border-cyanCustom pl-4">
      Maintaining a healthy lifestyle includes regular check-ups for early detection of health issues, a balanced diet to support overall wellness, proper sleep for mental and physical recovery, staying hydrated for optimal body function, and regular exercise to boost both physical and mental health.
      </h2>
     </div>
      {/* <div className="flex justify-center mb-6">
        <div className="w-20 border-b-4 border-cyanCustom"></div>
      </div> */}

      <AwesomeSlider
        animation="cubeAnimation"
        className="absolute inset-0 w-full h-full"
        bullets={false}
        organicArrows={true}
      >
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center h-full w-full text-white relative"
          >
            <img
              src={rec.image}
              alt={rec.title}
              className="object-cover w-full h-full opacity-50"
            />
            <div className="absolute top-0 w-full h-full bg-gradient-to-r from-cyanCustom to-transparent opacity-90"></div>

            {/* Overlay content */}
            <div className="absolute z-20 p-8 max-w-3xl mx-auto h-full flex flex-col justify-center items-center">
              <h3 className="text-4xl font-bold mb-4 animate__animated animate__fadeInUp">
                {rec.title}
              </h3>
              <p className="text-lg mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                {rec.description}
              </p>

              {/* Scrollable tips section with max-height */}
              <div className="overflow-y-auto max-h-48 px-4 w-full">
                <ul className="list-none space-y-3 text-lg font-light animate__animated animate__fadeInUp animate__delay-2s">
                  {rec.tips.map((tip, idx) => (
                    <li key={idx}>✨ {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </AwesomeSlider>
    </section>
  );
};

export default Recommendations;
