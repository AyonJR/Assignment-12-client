const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: "Summer Health Check-Up",
      description:
        "Get a comprehensive health check-up this summer at a discounted price. Ensure your well-being and stay healthy.",
      imageUrl: "https://i.ibb.co/w033x5n/pexels-gustavo-fring-7447002.jpg",
      discount: "20% OFF",
    },
    {
      id: 2,
      title: "Blood Donation Camp",
      description:
        "Join our blood donation camp and contribute to saving lives. Participants will receive a free health consultation.",
      imageUrl: "https://i.ibb.co/Vg3KMRD/pexels-franco30-12193105.jpg",
      discount: "FREE Health Consultation",
    },
    {
      id: 3,
      title: "Referral Program",
      description:
        "Refer a friend to our services and earn exciting rewards. Help your friends stay healthy while you get rewarded.",
      imageUrl: "https://i.ibb.co/W0qLrY7/pexels-cottonbro-4101143.jpg",
      discount: "Earn Rewards",
    },
  ];

  return (
    <section className=" p-6 mx-auto  rounded-md  mt-10">
      <div className="flex gap-5 items-center mb-6 mx-10">
        <h2 className="w-2/3 font-semibold border-r-4 border-cyanCustom pr-4">
          This summer, get a discounted health check-up and ensure your
          well-being. Participate in our Blood Donation Camp and enjoy a free
          health consultation. Plus, refer a friend through our Referral Program
          and earn exciting rewards!
        </h2>
        <h2 className="text-4xl font-semibold w-1/3  text-black  text-center mb-2">
          Our <span className="text-cyanCustom">Promotions</span>
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="p-4  overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl "
            >
              <img
                src={promotion.imageUrl}
                alt={promotion.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{promotion.title}</h3>
                <p className="mt-2 text-gray-600">{promotion.description}</p>
                <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold text-white bg-cyanCustom rounded-full">
                  {promotion.discount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
