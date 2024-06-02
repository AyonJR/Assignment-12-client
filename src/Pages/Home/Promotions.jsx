


const Promotions = () => {
    const promotions = [
        {
            id: 1,
            title: "Summer Health Check-Up",
            description: "Get a comprehensive health check-up this summer at a discounted price. Ensure your well-being and stay healthy.",
            imageUrl: "https://i.ibb.co/w033x5n/pexels-gustavo-fring-7447002.jpg",
            discount: "20% OFF",
        },
        {
            id: 2,
            title: "Blood Donation Camp",
            description: "Join our blood donation camp and contribute to saving lives. Participants will receive a free health consultation.",
            imageUrl: "https://i.ibb.co/Vg3KMRD/pexels-franco30-12193105.jpg",
            discount: "FREE Health Consultation",
        },
        {
            id: 3,
            title: "Referral Program",
            description: "Refer a friend to our services and earn exciting rewards. Help your friends stay healthy while you get rewarded.",
            imageUrl: "https://i.ibb.co/W0qLrY7/pexels-cottonbro-4101143.jpg",
            discount: "Earn Rewards",
        },
    ];

    return (
        <section className="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md mt-10">
            <h2 className="text-3xl font-semibold text-blue-400 text-center mb-6">Promotions</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {promotions.map(promotion => (
                    <div key={promotion.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                        <img src={promotion.imageUrl} alt={promotion.title} className="w-full h-48 object-cover rounded-md" />
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">{promotion.title}</h3>
                            <p className="mt-2 text-gray-600">{promotion.description}</p>
                            <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-400 rounded-full">{promotion.discount}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Promotions;
