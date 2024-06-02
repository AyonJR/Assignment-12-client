import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'animate.css';
import useTest from '../../CustomHooks/useTest';

// Sample recommendations data
// const recommendations = [
//   {
//     title: "Stay Hydrated",
//     description: "Drinking plenty of water keeps you hydrated, helps maintain the balance of body fluids, and aids in digestion. Aim for at least 8 glasses a day.",
//     image: "https://i.ibb.co/jkBCHjL/pexels-adrienn-638530-1458562.jpg",
//     tips: [
//       "Carry a water bottle with you.",
//       "Set reminders to drink water.",
//       "Eat water-rich foods like fruits and vegetables."
//     ]
//   },
//   {
//     title: "Regular Exercise",
//     description: "Engage in physical activities to improve your cardiovascular health, strengthen muscles, and boost mental health. Aim for at least 30 minutes daily.",
//     image: "https://i.ibb.co/P6v5mW4/pexels-823sl-2294361.jpg",
//     tips: [
//       "Choose activities you enjoy.",
//       "Exercise with a friend for motivation.",
//       "Mix different types of exercises for variety."
//     ]
//   },
//   {
//     title: "Balanced Diet",
//     description: "A balanced diet provides the nutrients your body needs to function effectively. Include a variety of fruits, vegetables, and whole grains.",
//     image: "https://i.ibb.co/DfRyLjy/pexels-mikhail-nilov-6740518.jpg",
//     tips: [
//       "Plan your meals ahead.",
//       "Incorporate a variety of food colors in your diet.",
//       "Avoid processed foods and sugary drinks."
//     ]
//   },
//   {
//     title: "Sleep Well",
//     description: "Adequate sleep is crucial for good health. It helps repair your body, improve memory, and boost your immune system. Aim for 7-8 hours nightly.",
//     image: "https://i.ibb.co/6sRKBLZ/pexels-ketut-subiyanto-4473864.jpg",
//     tips: [
//       "Maintain a consistent sleep schedule.",
//       "Create a restful sleeping environment.",
//       "Avoid caffeine and electronics before bedtime."
//     ]
//   },
//   {
//     title: "Regular Check-ups",
//     description: "Regular health check-ups can help find potential health issues before they become a problem. Early detection and treatment can improve outcomes.",
//     image: "https://i.ibb.co/2jJJZVp/pexels-cottonbro-8875625.jpg",
//     tips: [
//       "Schedule annual physical exams.",
//       "Keep track of your health records.",
//       "Discuss any health concerns with your doctor."
//     ]
//   }
// ]; 


const Recommendations = () => {

    const [recommendations] = useTest()

 


  return (
    <section className="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md mt-10">
      <h2 className="text-4xl font-bold text-center mb-6 text-blue-400 animate__animated animate__fadeInDown">Recommendations</h2>
      <AwesomeSlider animation="cubeAnimation">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-6 h-full w-full bg-gray-100  shadow-md">
            <img src={rec.image} alt={rec.title} className="w-full h-80 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">{rec.title}</h3>
            <p className="text-gray-700 mb-4">{rec.description}</p>
            <ul className="list-disc pl-5">
              {rec.tips.map((tip, idx) => (
                <li key={idx} className="text-gray-700 mb-2">{tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </AwesomeSlider>
    </section>
  );
};

export default Recommendations;
