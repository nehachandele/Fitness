import {
  FaRunning,
  FaRobot,
  FaChartLine,
  FaBolt
} from "react-icons/fa";

const FeaturesSection = () => {

  const features = [
    {
      icon: <FaRunning />,
      title: "Activity Tracking"
    },
    {
      icon: <FaRobot />,
      title: "AI Recommendations"
    },
    {
      icon: <FaChartLine />,
      title: "Analytics"
    },
    {
      icon: <FaBolt />,
      title: "Realtime Sync"
    }
  ];

  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-purple-600 text-4xl mb-4">
                {feature.icon}
              </div>

              <h3 className="font-bold text-xl">
                {feature.title}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;