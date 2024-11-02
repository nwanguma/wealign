import Link from "next/link";

import LogoWithText from "./LogoWithText";
import HomeAuthControls from "./HomeAuthControls";

const HomeNav = ({
  actionParam,
  pathname,
}: {
  actionParam: string;
  pathname: string;
}) => {
  const links: { href: string; name: string }[] = [
    {
      href: "/articles",
      name: "Articles",
    },
    {
      href: "/contact-us",
      name: "Contact us",
    },
  ];

  return (
    <>
      <nav className="flex justify-between items-center px-2 sm:px-6 h-10">
        <ul className="flex items-center">
          <li className="hover:scale-110 transform transition duration-300">
            <LogoWithText />
          </li>{" "}
          <ul className="ml-1 xs:ml-2 lg:ml-4 flex items-center">
            {links.map((link) => (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="cursor-pointer px-1 md:px-3 lg:px-6 py-2 text-md sm:text-base border-b border-transparent group-hover:border-b-violet-700 group-hover:text-violet-700 group-hover:font-normal transition-all duration-300 ease-in-out delay-150"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </ul>
        <ul className="space-x-1 sm:space-x-3 lg:space-x-5">
          <HomeAuthControls main action={actionParam} />
        </ul>
      </nav>
    </>
  );
};

export default HomeNav;
