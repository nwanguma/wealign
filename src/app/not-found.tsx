import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFoundPage: React.FC = ({ searchParams, params }: any) => {
  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-white">
      <nav className="flex justify-between items-center px-2 lg:px-6 py-3">
        <ul>
          <li className="hover:scale-110 transform transition duration-300">
            <Link href="/">
              <Image
                src="/icons/collabhub-logo.svg"
                alt="home"
                width={140}
                height={50}
                className="hover:opacity-80 transition duration-300"
              />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex-grow w-full flex flex-col justify-center relative">
        <div className="w-11/12 sm:w-10/12 lg:w-7/12 mx-auto space-y-2 sm:space-y-3">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-700">
            Page Not Found!
          </div>
          <div className="text-gray-500 text-base sm:text-lg-xl break-all">
            Oops! It looks like we couldn’t find the page you’re looking for.
          </div>
          <div className="text-gray-500 text-base sm:text-lg-xl break-all">
            You can{" "}
            <Link href="/" className="text-blue-700 font-medium">
              Go home
            </Link>{" "}
            or{" "}
            <Link
              href="mailto:support@collabhub.io"
              className="text-blue-700 font-medium"
            >
              contact us
            </Link>{" "}
            if you need further assistance.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
