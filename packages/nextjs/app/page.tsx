const items = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "how-it-works",
    title: "How It Works",
  },
  {
    id: "rewards",
    title: "Rewards",
  },
  {
    id: "faq",
    title: "FAQ",
  },
];
const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        {
          items.map((item) => (
            <div key={item.id} id={item.id} className="bg-white rounded-lg p-4 shadow-md h-[500px] mb-8">
              <h1 className="text-2xl font-bold text-center">{item.title}</h1>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
