import Link from "next/link";
import Image from "next/image";
import {  MapPin, CalendarCheck2, SlidersHorizontal, Handshake, } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <nav className="bg-[#0E1E33] text-4xl text-gray-400 py-4 px-8">
          <h1 className="font-bold text-[#F9B233]">MeetSync</h1>
      </nav>

      <section className="bg-[#0E1E33] text-white py-24">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Hangouts Made Easy
            </h2>
            <p className="text-3xl text-gray-400">
              Say goodbye to hours of planning
            </p>
            <div className="flex space-x-4">
              <Link
                href="/signup"
                className="bg-[#F9B233] text-[#0E1E33] font-semibold py-3 px-8 rounded-lg hover:bg-yellow-500"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="border-2 border-[#F9B233] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#F9B233] hover:text-[#0E1E33] transition"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <Image
              src="/isoOverlapTransparent.png"
              alt="MeetSync illustration"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-4">Why Choose MeetSync?</h3>
          <p className="text-center text-gray-700 mb-12">
            Our app makes planning hangouts simple and fair for everyone
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <MapPin className="w-12 h-12 text-[#F9B233] mb-4" />
              <h4 className="font-semibold text-xl mb-2">Smart Location Finding</h4>
              <p className="text-gray-600">
                Automatically calculates the most convenient meeting spots based on everyone’s locations and travel preferences
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <CalendarCheck2 className="w-12 h-12 text-[#F9B233] mb-4" />
              <h4 className="font-semibold text-xl mb-2">Fair Planning</h4>
              <p className="text-gray-600">
                Everyone gets a vote on day and time for the hangout. Ranked choice voting determines the final meeting location
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <SlidersHorizontal className="w-12 h-12 text-[#F9B233] mb-4" />
              <h4 className="font-semibold text-xl mb-2">Highly Configurable</h4>
              <p className="text-gray-600">
                Input unique starting locations, travel times, and mode of transport for each hangout when confirming availability
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
              <Handshake className="w-12 h-12 text-[#F9B233] mb-4" />
              <h4 className="font-semibold text-xl mb-2">Effortless Coordination</h4>
              <p className="text-gray-600">
                Simplifies the entire planning process - from inviting friends to choosing a time and place
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">How it works</h3>
          <p className="text-gray-700 mb-12">
            Your ideal hangout is just a few steps away
          </p>
          <div className="space-y-12 max-w-xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-[#F9B233] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                1
              </div>
              <h5 className="font-semibold text-xl">Add Your Friends</h5>
              <p className="text-gray-600 mt-2">Tell your friends about MeetSync!</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#F9B233] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                2
              </div>
              <h5 className="font-semibold text-xl">Create a Hangout</h5>
              <p className="text-gray-600 mt-2">
                Create a hangout on the home page and invite your friends.
                Check incoming invitations on the notifications page
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#F9B233] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                3
              </div>
              <h5 className="font-semibold text-xl">Determine Date and Time</h5>
              <p className="text-gray-600 mt-2">
                Creator inputs availability options. Everyone else votes. When a
                time is picked, confirm your availability and input your starting
                address, travel time, and transport mode
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#F9B233] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                4
              </div>
              <h5 className="font-semibold text-xl">Determine Location</h5>
              <p className="text-gray-600 mt-2">
                Ranked choice voting on the options provided by our algorithm
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#F9B233] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                5
              </div>
              <h5 className="font-semibold text-xl">Show Up</h5>
              <p className="text-gray-600 mt-2">Don’t flake!</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0E1E33] text-white pt-12 pb-6">
        <div className="container mx-auto px-6 text-center mb-6">
          <h4 className="text-[#F9B233] text-2xl font-bold">MeetSync</h4>
          <p className="mt-2 mb-4">MeetSync is in its earliest stages. Please leave feedback.</p>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLScT97CrMNg58HUl2lkmfedUCRGLtYcFpc_RVFu--bQvLX-VXg/viewform"
            className="inline-block bg-[#F9B233] hover:bg-yellow-500 text-[#0E1E33] font-semibold py-2 px-6 rounded-lg"
          >
            Feedback Form
          </Link>
        </div>
        <div className="border-t-2 border-[#F9B233] mx-auto w-full my-4" />
        <div className="container mx-auto px-6">
          <p className="text-left text-sm">
            © 2025 MeetSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
