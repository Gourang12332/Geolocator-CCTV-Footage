// "use client";
// import { useSession, signOut } from "next-auth/react";
// export default function Dashboard() {
 

//   const { data: session } = useSession();

//   if (!session) {
//     return (
//     <>
//     <p>Not authenticated</p>
//     <button className="signin" onClick={() =>{
//       window.location.href = "/sign-in"
//     }}>
//       Sign in
//     </button>
//     </> )
//   }

//   return(
//     <div>
//       <p>Welcome {session.user.username}</p>
//       <button
//         onClick={() => signOut()}
//         className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
//       >
//         Sign Out
//       </button>
//     </div>
//   );
// }


"use client";
import { useSession, signOut } from "next-auth/react";
import Footer from '@/components/landing/Footer'; // Import Footer
import Hero from '@/components/landing/Hero'; // Import Hero
import Navbar from '@/components/landing/NavBar'; // Import Navbar
import LandingPage from "@/components/landing/LandingPage";
export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        {/* Render Navbar, Hero, and Footer when session is not available */}
        <Navbar isLoggedIn={false} /> {/* Pass isLoggedIn as false */}
        <Hero /> {/* Hero section */}
        <Footer /> {/* Footer section */}
        <div className="text-center mt-4">
          <p>Not authenticated</p>
          {/* <button
            className="signin mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={() => {
              window.location.href = "/sign-in";
            }}
          >
            Sign in
          </button> */}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Navbar isLoggedIn={true} /> {/* Pass isLoggedIn as false */}
        <Hero /> {/* Hero section */}
        <LandingPage/>
        <Footer /> {/* Footer section */}
        
      <p>Welcome {session.user.username}</p>
      <button
        onClick={() => signOut()}
        className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}
