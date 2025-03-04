import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Kimberly Cascante",
    image: "/Kim.png",
    github: "https://github.com/kimcascante",
  },
  {
    name: "Jefferson Calderon",
    image: "/Jeff.jpeg",
    github: "https://github.com/xJeffx23",
  },
  {
    name: "Joseph Poveda",
    image: "/Joseph.jpeg",
    github: "https://github.com/josephpdf/",
  },
  {
    name: "Andrés Villanueva",
    image: "/Andres.jpeg",
    github: "https://github.com/drakkomaximo",
  },
  {
    name: "David Melendez",
    image: "/David.jpeg",
    github: "https://github.com/davidmelendez",
  },
];

const AboutUsPage = () => {
  return (
    <div className="text-white pt-28 md:pb-20 pb-4 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold px-4 md:px-0 md:text-left text-center">
        ABOUT STARKLOTTO
      </h1>

      <div className="flex flex-col md:flex-row md:gap-16">
        {/* Left Column */}
        <div className="md:w-1/2 px-4 md:px-0">
          <div className="mt-6 md:mt-8">
            <h2 className="font-bold uppercase">MISSION STATEMENT</h2>
            <p className="mt-2 text-sm md:text-lg opacity-90">
              At StarkLotto, our mission is to revolutionize the lottery
              experience through blockchain technology. We create a secure,
              transparent and accessible environment where everyone has the
              opportunity to win and be part of the future of digital lotteries.
            </p>
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="font-bold uppercase">VISION STATEMENT</h2>
            <p className="mt-2 text-sm md:text-lg opacity-90">
              To be the leading decentralized lottery platform, recognized for
              its innovation, security and commitment to the global community.
            </p>
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="font-bold uppercase">WHY CHOOSE US?</h2>
            <ul className="mt-2 text-sm md:text-lg opacity-90 space-y-2 list-inside">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  100% Decentralized Lottery: Each draw is verifiable and cannot
                  be manipulated.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Crypto Prizes: Win prizes in ETH and exclusive NFTs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Secure Gaming: Integration with secure wallets such as
                  Braavos.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 px-4 md:px-0 mt-8 md:mt-8">
          <h2 className="font-bold uppercase text-center mb-4">
            MEET THE MINDS BEHIND STARKLOTTO
          </h2>

          <a
            href="https://github.com/future-minds7"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-32 h-32 mx-auto"
          >
            <Image
              src="/FutureMindsLogo.png"
              alt="Future Minds Logo"
              width={128}
              height={128}
              className="rounded-full"
            />
          </a>

          <div className="flex justify-center gap-2 mt-4">
            {teamMembers.map((member) => (
              <a
                href={member.github}
                key={member.name}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-16 md:h-16"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={64}
                  height={64}
                  className="rounded-full w-full h-full object-cover"
                />
              </a>
            ))}
          </div>

          <p className="mt-4 text-sm md:text-lg text-center opacity-90">
            We are a passionate team of developers, designers, and innovators
            participating in the Winter Hackathon 2025. Our mission is to build
            a decentralized lottery system leveraging blockchain technology to
            ensure transparency, fairness, and on-chain prize distribution
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
