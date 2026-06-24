import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaRobot,
  FaLightbulb,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

import { toast } from "react-toastify";

import AppLayout from "../components/layout/AppLayout";

import { getUser } from "../utils/auth";

import {
  generateRecommendation,
  getUserRecommendations,
} from "../services/recommendationService";

const RecommendationsPage = () => {
  const user = getUser();

  const [recommendations, setRecommendations] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      improvements: "",
      suggestions: "",
      safety: "",
      activityId: "",
    });

  const fetchRecommendations =
    async () => {
      try {
        const data =
          await getUserRecommendations(
            user.id
          );

        setRecommendations(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await generateRecommendation({
        userId: user.id,

        activityId:
          formData.activityId,

        improvements:
          formData.improvements
            .split(","),

        suggestions:
          formData.suggestions
            .split(","),

        safety:
          formData.safety.split(","),
      });

      toast.success(
        "Recommendation Generated",
        {
          style: {
            background:
              "#23084D",
            color: "#fff",
          },
        }
      );

      setFormData({
        improvements: "",
        suggestions: "",
        safety: "",
        activityId: "",
      });

      fetchRecommendations();
    } catch (error) {
      toast.error(
        "Generation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">

        {/* Hero */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          rounded-3xl
          p-8
          text-white
          bg-gradient-to-r
          from-[#23084D]
          via-[#5B21B6]
          to-pink-500
          shadow-xl
          "
        >
          <div className="flex items-center gap-4">
            <FaRobot
              className="text-5xl"
            />

            <div>
              <h1
                className="
                text-3xl
                font-bold
                "
              >
                AI Fitness Coach
              </h1>

              <p className="text-violet-100">
                Personalized
                recommendations for
                better performance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Generate Form */}

        <div
          className="
          bg-white
          rounded-3xl
          p-6
          shadow-lg
          "
        >
          <h2
            className="
            text-xl
            font-bold
            text-[#23084D]
            "
          >
            Generate Recommendation
          </h2>

          <form
            onSubmit={handleSubmit}
            className="
            mt-6
            space-y-4
            "
          >
            <input
              placeholder="Activity Id"
              value={
                formData.activityId
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  activityId:
                    e.target.value,
                })
              }
              className="
              w-full
              p-3
              rounded-xl
              border
              border-violet-200
              "
            />

            <textarea
              placeholder="Improvements (comma separated)"
              rows={3}
              value={
                formData.improvements
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  improvements:
                    e.target.value,
                })
              }
              className="
              w-full
              p-3
              rounded-xl
              border
              border-violet-200
              "
            />

            <textarea
              placeholder="Suggestions (comma separated)"
              rows={3}
              value={
                formData.suggestions
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  suggestions:
                    e.target.value,
                })
              }
              className="
              w-full
              p-3
              rounded-xl
              border
              border-violet-200
              "
            />

            <textarea
              placeholder="Safety Tips (comma separated)"
              rows={3}
              value={
                formData.safety
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  safety:
                    e.target.value,
                })
              }
              className="
              w-full
              p-3
              rounded-xl
              border
              border-violet-200
              "
            />

            <button
              disabled={loading}
              className="
              w-full
              bg-[#23084D]
              hover:bg-[#3B1175]
              text-white
              py-3
              rounded-xl
              "
            >
              {loading
                ? "Generating..."
                : "Generate"}
            </button>
          </form>
        </div>

        {/* Recommendation History */}

        <div>
          <h2
            className="
            text-2xl
            font-bold
            text-[#23084D]
            mb-4
            "
          >
            Recommendation History
          </h2>

          <div className="grid gap-5">

            {recommendations.map(
              (item) => (
                <motion.div
                  key={item.id}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-lg
                  "
                >
                  <h3
                    className="
                    text-xl
                    font-bold
                    text-[#23084D]
                    mb-4
                    "
                  >
                    {
                      item.type
                    }
                  </h3>

                  <div className="space-y-5">

                    <div
                      className="
                      bg-blue-50
                      rounded-2xl
                      p-4
                      "
                    >
                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        mb-2
                        "
                      >
                        <FaChartLine />
                        <span>
                          Improvements
                        </span>
                      </div>

                      <ul>
                        {item.improvements?.map(
                          (
                            tip,
                            i
                          ) => (
                            <li
                              key={
                                i
                              }
                            >
                              • {tip}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div
                      className="
                      bg-violet-50
                      rounded-2xl
                      p-4
                      "
                    >
                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        mb-2
                        "
                      >
                        <FaLightbulb />
                        <span>
                          Suggestions
                        </span>
                      </div>

                      <ul>
                        {item.suggestions?.map(
                          (
                            tip,
                            i
                          ) => (
                            <li
                              key={
                                i
                              }
                            >
                              • {tip}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div
                      className="
                      bg-green-50
                      rounded-2xl
                      p-4
                      "
                    >
                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        mb-2
                        "
                      >
                        <FaShieldAlt />
                        <span>
                          Safety Tips
                        </span>
                      </div>

                      <ul>
                        {item.safety?.map(
                          (
                            tip,
                            i
                          ) => (
                            <li
                              key={
                                i
                              }
                            >
                              • {tip}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                  </div>
                </motion.div>
              )
            )}

          </div>
        </div>

      </div>
    </AppLayout>
  );
};

export default RecommendationsPage;