import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  FaMagic,
  FaLightbulb,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

import AppLayout from "../components/layout/AppLayout";

import {
  getUserRecommendations,
  generateRecommendation,
} from "../services/recommendationService";

import {
  getActivities,
} from "../services/activityService";

import { getUser } from "../utils/auth";

import { toast } from "react-toastify";

const RecommendationsPage = () => {

  const user = getUser();

  const [
    recommendations,
    setRecommendations,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    generating,
    setGenerating,
  ] = useState(false);

  useEffect(() => {

    loadRecommendations();

  }, []);

  const loadRecommendations =
    async () => {

      try {

        const data =
          await getUserRecommendations(
            user.id
          );

        setRecommendations(
          data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const handleGenerate =
    async () => {

      try {

        setGenerating(true);

        const activities =
          await getActivities();

        if (
          activities.length === 0
        ) {

          toast.warning(
            "Track an activity first."
          );

          return;
        }

        const latestActivity =
          [...activities]
            .sort(
              (a, b) =>
                new Date(
                  b.startTime
                ) -
                new Date(
                  a.startTime
                )
            )[0];

        await generateRecommendation({
          userId: user.id,
          activityId:
            latestActivity.id,
          improvements: [],
          suggestions: [],
          safety: [],
        });

        toast.success(
          "Recommendation Generated"
        );

        loadRecommendations();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to generate recommendation"
        );

      } finally {

        setGenerating(false);

      }
    };

  return (
    <AppLayout>

      <div className="space-y-8">

        {/* HERO */}

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
          bg-gradient-to-r
          from-[#23084D]
          via-[#4C1D95]
          to-[#7C3AED]
          rounded-3xl
          p-8
          text-white
          shadow-xl
          "
        >
          <h1
            className="
            text-3xl
            font-bold
            "
          >
            ✨ AI Fitness Coach
          </h1>

          <p
            className="
            mt-3
            text-violet-100
            "
          >
            Smart recommendations
            based on your workout
            activity and progress.
          </p>

          <button
            onClick={
              handleGenerate
            }
            disabled={
              generating
            }
            className="
            mt-6
            bg-white
            text-[#23084D]
            font-semibold
            px-6
            py-3
            rounded-2xl
            hover:scale-105
            transition
            "
          >
            {generating
              ? "Generating..."
              : "✨ Generate Smart Recommendation"}
          </button>
        </motion.div>

        {/* LOADING */}

        {loading ? (

          <div
            className="
            bg-white
            p-8
            rounded-3xl
            shadow-lg
            text-center
            "
          >
            Loading Recommendations...
          </div>

        ) : recommendations.length ===
          0 ? (

          <div
            className="
            bg-white
            p-10
            rounded-3xl
            shadow-lg
            text-center
            "
          >
            <FaMagic
              className="
              mx-auto
              text-5xl
              text-violet-400
              "
            />

            <p
              className="
              mt-4
              text-gray-500
              "
            >
              No recommendations
              available yet.
            </p>
          </div>

        ) : (

          <div
            className="
            grid
            lg:grid-cols-2
            gap-6
            "
          >

            {recommendations.map(
              (
                recommendation
              ) => (

                <motion.div
                  key={
                    recommendation.id
                  }
                  whileHover={{
                    y: -5,
                  }}
                  className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-lg
                  "
                >

                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    mb-4
                    "
                  >
                    <FaChartLine
                      className="
                      text-violet-600
                      "
                    />

                    <h2
                      className="
                      text-xl
                      font-bold
                      text-[#23084D]
                      "
                    >
                      Recommendation
                    </h2>
                  </div>

                  <p
                    className="
                    text-gray-600
                    "
                  >
                    {
                      recommendation.recommendation
                    }
                  </p>

                  {/* Improvements */}

                  {recommendation.improvements
                    ?.length > 0 && (

                    <div className="mt-5">

                      <h3
                        className="
                        font-semibold
                        flex
                        items-center
                        gap-2
                        "
                      >
                        <FaLightbulb />
                        Improvements
                      </h3>

                      <ul
                        className="
                        mt-2
                        space-y-2
                        "
                      >
                        {recommendation.improvements.map(
                          (
                            item,
                            index
                          ) => (
                            <li
                              key={
                                index
                              }
                            >
                              • {item}
                            </li>
                          )
                        )}
                      </ul>

                    </div>
                  )}

                  {/* Suggestions */}

                  {recommendation.suggestions
                    ?.length > 0 && (

                    <div className="mt-5">

                      <h3
                        className="
                        font-semibold
                        "
                      >
                        Suggestions
                      </h3>

                      <ul
                        className="
                        mt-2
                        space-y-2
                        "
                      >
                        {recommendation.suggestions.map(
                          (
                            item,
                            index
                          ) => (
                            <li
                              key={
                                index
                              }
                            >
                              • {item}
                            </li>
                          )
                        )}
                      </ul>

                    </div>
                  )}

                  {/* Safety */}

                  {recommendation.safety
                    ?.length > 0 && (

                    <div className="mt-5">

                      <h3
                        className="
                        font-semibold
                        flex
                        items-center
                        gap-2
                        "
                      >
                        <FaShieldAlt />
                        Safety
                      </h3>

                      <ul
                        className="
                        mt-2
                        space-y-2
                        "
                      >
                        {recommendation.safety.map(
                          (
                            item,
                            index
                          ) => (
                            <li
                              key={
                                index
                              }
                            >
                              • {item}
                            </li>
                          )
                        )}
                      </ul>

                    </div>
                  )}

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </AppLayout>
  );
};

export default RecommendationsPage;