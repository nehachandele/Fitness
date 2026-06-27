
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaWeight,
  FaRulerVertical,
  FaBullseye,
  FaRunning,
  FaUtensils,
  FaMars,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import api from "../services/api";
import { getUser } from "../utils/auth";

const genders = [
  "Male",
  "Female",
  "Other",
];

const goals = [
  "Lose Weight",
  "Gain Muscle",
  "Maintain Weight",
  "Improve Endurance",
  "General Fitness",
];

const experienceLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const activityLevels = [
  "Sedentary",
  "Lightly Active",
  "Moderately Active",
  "Very Active",
];

const dietPreferences = [
  "Vegetarian",
  "Vegan",
  "Non Vegetarian",
  "Keto",
  "High Protein",
];

const ProfileSetupPage = () => {

  const navigate = useNavigate();

  const currentUser = getUser();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    fitnessGoal: "",
    experienceLevel: "",
    activityLevel: "",
    dietPreference: "",
  });

  useEffect(() => {

    if (!currentUser) {
      navigate("/login");
    }

  }, []);

  const bmi = useMemo(() => {

    if (!formData.height || !formData.weight) {
      return 0;
    }

    const h =
      Number(formData.height) / 100;

    return (
      Number(formData.weight) /
      (h * h)
    ).toFixed(1);

  }, [formData.height, formData.weight]);

  const bmiStatus = useMemo(() => {

    if (bmi == 0) return "";

    if (bmi < 18.5)
      return "Underweight";

    if (bmi < 25)
      return "Normal";

    if (bmi < 30)
      return "Overweight";

    return "Obese";

  }, [bmi]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.age ||
      !formData.height ||
      !formData.weight ||
      !formData.gender ||
      !formData.fitnessGoal ||
      !formData.experienceLevel ||
      !formData.activityLevel ||
      !formData.dietPreference
    ) {

      toast.error(
        "Please fill all fields."
      );

      return;

    }

    try {

      setLoading(true);

      await api.put(

        `/api/users/profile/${currentUser.id}`,

        formData

      );

      toast.success(
        "Profile Updated Successfully"
      );

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      toast.error(
        "Unable to save profile."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AppLayout>

      <motion.div

        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="
        max-w-5xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-xl
        overflow-hidden
        "

      >

        <div
          className="
          bg-gradient-to-r
          from-[#23084D]
          via-[#4C1D95]
          to-[#7C3AED]
          p-10
          text-white
          "
        >

          <h1 className="text-4xl font-bold">

            Complete Your Profile

          </h1>

          <p className="mt-2 text-violet-100">

            Tell us about yourself to
            receive personalized AI
            recommendations.

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="
          p-8
          grid
          md:grid-cols-2
          gap-6
          "
        >

          {/* Age */}

          <div>

            <label className="font-semibold mb-2 block">

              Age

            </label>

            <div className="relative">

              <FaUser
                className="
                absolute
                top-4
                left-4
                text-violet-500
                "
              />

              <input

                type="number"

                name="age"

                value={formData.age}

                onChange={handleChange}

                className="
                w-full
                border
                rounded-xl
                pl-12
                pr-4
                py-3
                focus:ring-2
                focus:ring-violet-500
                outline-none
                "

              />

            </div>

          </div>

          {/* Height */}

          <div>

            <label className="font-semibold mb-2 block">

              Height (cm)

            </label>

            <div className="relative">

              <FaRulerVertical
                className="
                absolute
                top-4
                left-4
                text-violet-500
                "
              />

              <input

                type="number"

                name="height"

                value={formData.height}

                onChange={handleChange}

                className="
                w-full
                border
                rounded-xl
                pl-12
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-violet-500
                "

              />

            </div>

          </div>

          {/* Weight */}

          <div>

            <label className="font-semibold mb-2 block">

              Weight (kg)

            </label>

            <div className="relative">

              <FaWeight
                className="
                absolute
                top-4
                left-4
                text-violet-500
                "
              />

              <input

                type="number"

                name="weight"

                value={formData.weight}

                onChange={handleChange}

                className="
                w-full
                border
                rounded-xl
                pl-12
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-violet-500
                "

              />

            </div>

          </div>
                    {/* Gender */}

          <div>

            <label className="font-semibold mb-2 block">
              Gender
            </label>

            <div className="relative">

              <FaMars
                className="
                absolute
                top-4
                left-4
                text-violet-500
                "
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="
                w-full
                border
                rounded-xl
                pl-12
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-violet-500
                "
              >
                <option value="">
                  Select Gender
                </option>

                {genders.map((gender) => (
                  <option
                    key={gender}
                    value={gender}
                  >
                    {gender}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* Fitness Goal */}

          <div>

            <label className="font-semibold mb-2 block">
              Fitness Goal
            </label>

            <div className="relative">

              <FaBullseye
                className="
                absolute
                top-4
                left-4
                text-violet-500
                "
              />

              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="
                w-full
                border
                rounded-xl
                pl-12
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-violet-500
                "
              >
                <option value="">
                  Select Goal
                </option>

                {goals.map((goal) => (
                  <option
                    key={goal}
                    value={goal}
                  >
                    {goal}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* Experience */}

          <div>

            <label className="font-semibold mb-2 block">
              Experience Level
            </label>

            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-violet-500
              "
            >

              <option value="">
                Select Experience
              </option>

              {experienceLevels.map((item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>

          </div>

          {/* Activity Level */}

          <div>

            <label className="font-semibold mb-2 block">
              Activity Level
            </label>

            <div className="relative">

              <FaRunning
                className="
                absolute
                top-4
                left-4
                text-violet-500
                "
              />

              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="
                w-full
                border
                rounded-xl
                pl-12
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-violet-500
                "
              >

                <option value="">
                  Select Activity Level
                </option>

                {activityLevels.map((item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* Diet */}

          <div>

            <label className="font-semibold mb-2 block">
              Diet Preference
            </label>

            <div className="relative">

              <FaUtensils
                className="
                absolute
                top-4
                left-4
                text-violet-500
                "
              />

              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
                className="
                w-full
                border
                rounded-xl
                pl-12
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-violet-500
                "
              >

                <option value="">
                  Select Diet
                </option>

                {dietPreferences.map((item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* BMI Card */}

          <motion.div

            whileHover={{
              scale: 1.02,
            }}

            className="
            md:col-span-2
            bg-gradient-to-r
            from-[#23084D]
            via-[#4C1D95]
            to-[#7C3AED]
            rounded-3xl
            text-white
            p-8
            mt-2
            "

          >

            <h2 className="text-2xl font-bold">
              Live BMI Calculator
            </h2>

            <div className="mt-6 flex justify-between items-center">

              <div>

                <p className="text-violet-200">
                  Your BMI
                </p>

                <h1 className="text-5xl font-bold">
                  {bmi}
                </h1>

              </div>

              <div className="text-right">

                <p className="text-violet-200">
                  Status
                </p>

                <h2 className="text-3xl font-semibold">
                  {bmiStatus || "--"}
                </h2>

              </div>

            </div>

          </motion.div>

          {/* Save Button */}

          <div className="md:col-span-2">

            <motion.button

              whileHover={{
                scale: 1.02,
              }}

              whileTap={{
                scale: 0.97,
              }}

              type="submit"

              disabled={loading}

              className="
              w-full
              mt-4
              bg-gradient-to-r
              from-[#23084D]
              via-[#4C1D95]
              to-[#7C3AED]
              text-white
              rounded-xl
              py-4
              font-semibold
              text-lg
              flex
              justify-center
              items-center
              gap-3
              hover:shadow-xl
              transition
              "

            >

              <FaSave />

              {loading
                ? "Saving..."
                : "Complete Profile"}

            </motion.button>

          </div>

        </form>

      </motion.div>

    </AppLayout>

  );

};

export default ProfileSetupPage;