const StatsSection = () => {

  const stats = [
    {
      value:"10K+",
      label:"Users"
    },
    {
      value:"50K+",
      label:"Activities"
    },
    {
      value:"100+",
      label:"Workouts"
    },
    {
      value:"4.9",
      label:"Rating"
    }
  ];

  return (
    <section className="py-12 lg:py-20">

      <div className="max-w-7xl mx-auto px-5">

        <div
          className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-5
        "
        >
          {stats.map((item,index)=>(
            <div
              key={index}
              className="
              bg-white
              rounded-3xl
              p-6
              shadow-[0_10px_30px_rgba(35,8,77,0.08)]
            "
            >
              <h2
                className="
                text-3xl
                font-bold
                text-[#23084D]
              "
              >
                {item.value}
              </h2>

              <p className="text-gray-500 mt-2">
                {item.label}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;