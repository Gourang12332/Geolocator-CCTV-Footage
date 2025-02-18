"use client";

import Link from "next/link";
import { Button } from "../ui/button";

const navigationOptions = [
  { title: "Home", link: "/" },
  { title: "Track", link: "#red" },
  { title: "About Us", link: "#blue" },
  { title: "Contact", link: "/" },
];

// Props type definition
interface NavBarProps {
  isLoggedIn: boolean; // Flag to indicate if the user is logged in
}

// LogInSignUp Component
function LogInSignUp() {
  return (
    <div>
      <Link href="/sign-in/">
        <Button className="px-4 py-2 text-base">Login</Button>
      </Link>
      <Link href="/sign-up/">
        <Button className="ml-4 px-4 py-2 text-base">SignUp</Button>
      </Link>
    </div>
  );
}

// NavBar Component
export default function NavBar({ isLoggedIn }: NavBarProps) {
  return (
    <nav className="shadow-md bg-gray-50">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex-shrink-0 text-3xl font-bold text-blue-500">
          Detective
        </div>

        {/* Navigation Options */}
        <div className="flex flex-1 justify-center">
          <div className="hidden gap-6 md:flex">
            {navigationOptions.map((option) => (
              <a href={option.link} key={option.title}>
                <Button variant="link" className="text-lg">
                  {option.title}
                </Button>
              </a>
            ))}
          </div>
        </div>

        {/* Profile or Log In/Sign Out */}
        <div className="flex flex-shrink-0 gap-4">
          {isLoggedIn ? (
            <Button
              onClick={() => {
                // Handle sign out logic here
                console.log("Sign out clicked");
              }}
              className="px-4 py-2 text-base bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Sign Out
            </Button>
          ) : (
            <LogInSignUp />
          )}
        </div>
      </div>
    </nav>
  );
}