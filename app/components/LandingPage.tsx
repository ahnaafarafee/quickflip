import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import { Brain, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { playFairDisplay } from "../fonts";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

const testimonials = [
  {
    name: "Alex Johnson",
    title: "Student",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    quote:
      "QuickFlip made learning so much fun! I mastered new subjects in no time.",
  },
  {
    name: "Maria Gomez",
    title: "Teacher",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    quote:
      "I love how engaging QuickFlip is for my students. It's a game changer in the classroom!",
  },
  {
    name: "David Lee",
    title: "Developer",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    quote:
      "The interactive flashcards helped me prepare for coding interviews like a pro.",
  },
];

export default function LandingPage() {
  const { userId } = auth();
  if (userId) redirect("/decks");

  return (
    <div className="flex flex-col min-h-screen bg-color">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 px-4 md:px-6 mt-6">
          <div className="container mx-auto">
            <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <h1
                  className={`${playFairDisplay.className} text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 mb-4 pb-2`}
                >
                  Flip Your Way to Knowledge
                </h1>
                <div className="relative flex justify-center sm:justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 20"
                    className="w-full h-6"
                  >
                    <path
                      d="M0 10 Q 30 0, 60 10 T 120 10 T 180 10"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      fill="transparent"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  QuickFlip: The fastest way to learn and memorize. Create,
                  study, and master your flashcards with ease.
                </p>
                <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Button size="3">
                    <SignInButton />
                    <ArrowRightIcon />
                  </Button>
                  <button className="text-blue-500 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 text-lg px-8 py-3 rounded-full transition-all duration-200">
                    More About Us
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 !mb-10">
                  🚀 Join 10,000+ learners already flipping their way to
                  success!
                </p>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 rounded-2xl transform rotate-3"></div>

                <Image
                  src="/flashcards-hero-image.webp?height=300&width=300"
                  width={300}
                  height={300}
                  alt="QuickFlip app interface"
                  className="rounded-2xl shadow-lg relative z-10 transform -rotate-3 transition-transform duration-300 hover:rotate-0"
                />

                {/* Quirky Text 1 */}
                <div className="absolute top-0 left-2 transform -rotate-45 bg-yellow-300 text-purple-800 p-2 rounded-lg shadow-lg text-lg font-bold">
                  Wow, so easy!
                </div>

                {/* Quirky Text 2 */}
                <div className="absolute bottom-0 right-1 transform -rotate-45 bg-green-300 text-blue-800 p-2 rounded-lg shadow-lg text-lg font-bold">
                  Learning is fun!
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 ">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">What People Are Saying</h2>
            <p className="mt-4">
              Here’s what our users have to say about QuickFlip
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="flex flex-wrap justify-center gap-8 px-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full sm:w-72 rounded-xl shadow-lg dark:shadow-gray-950 p-6 text-center"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 mx-auto rounded-full mb-4 shadow-md"
                />
                <h3 className="text-xl font-semibold ">{testimonial.name}</h3>
                <p className="text-sm">{testimonial.title}</p>
                <p className=" italic mt-4">&quot;{testimonial.quote}&quot;</p>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white">
              Why Choose QuickFlip?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center group">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800">
                  <Brain className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Efficient Learning
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Optimize your study time with our scientifically-backed spaced
                  repetition system.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center group">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center transition-colors duration-300 group-hover:bg-teal-200 dark:group-hover:bg-teal-800">
                  <Sparkles className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Intuitive Interface
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create and study flashcards with our user-friendly,
                  distraction-free design.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center group">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center transition-colors duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800">
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Collaborative Learning
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Share decks and study with friends to enhance your learning
                  experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                  Ready to Flip the Switch on Learning?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Join thousands of students and professionals who are
                  accelerating their learning with QuickFlip.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <TextField.Root placeholder="Email Address">
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>

                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Start for free today. No payments or credit card required
                  whatsoever.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50 dark:bg-gray-900">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Ahnaaf Rafee. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
