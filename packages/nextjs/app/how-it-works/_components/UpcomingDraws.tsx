import React from "react";

const UpcomingDraws = () => {
  const generateRandomDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString();
  };

  const draws = [
    {
      drawNumber: "#12345",
      prizePool: "15 ETH",
      ticketPrice: "$10",
      timeLeft: "2 days",
      status: "Open",
      date: generateRandomDate(2),
    },
    {
      drawNumber: "#12346",
      prizePool: "10 ETH",
      ticketPrice: "$5",
      timeLeft: "1 day",
      status: "Open",
      date: generateRandomDate(1),
    },
    {
      drawNumber: "#12347",
      prizePool: "20 ETH",
      ticketPrice: "$15",
      timeLeft: "3 days",
      status: "Open",
      date: generateRandomDate(3),
    },
    {
      drawNumber: "#12348",
      prizePool: "5 ETH",
      ticketPrice: "$2",
      timeLeft: "4 days",
      status: "Open",
      date: generateRandomDate(4),
    },
    {
      drawNumber: "#12349",
      prizePool: "25 ETH",
      ticketPrice: "$20",
      timeLeft: "5 days",
      status: "Open",
      date: generateRandomDate(5),
    },
  ];

  return (
    <div className=" hidden md:block py-12 px-4">
      <h2 className="text-4xl font-bold mb-6">UPCOMING DRAWS</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 bg-gray-800 rounded-lg shadow-lg">
          <thead className="bg-gray-700">
            <tr>
              <th className="border border-gray-600 px-4 py-2">Date</th>
              <th className="border border-gray-600 px-4 py-2">Draw Number</th>
              <th className="border border-gray-600 px-4 py-2">Prize Pool</th>
              <th className="border border-gray-600 px-4 py-2">Ticket Price</th>
              <th className="border border-gray-600 px-4 py-2">Time Left</th>
              <th className="border border-gray-600 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {draws.map((draw, index) => (
              <tr
                key={index}
                className="hover:bg-gray-600 transition-colors duration-200"
              >
                <td className="border border-gray-600 px-4 py-2">
                  {draw.date}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {draw.drawNumber}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {draw.prizePool}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {draw.ticketPrice}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {draw.timeLeft}
                </td>
                <td className="border border-gray-600 px-4 py-2">
                  {draw.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingDraws;
