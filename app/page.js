import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white text-gray-900">

      {/* Background Patterns */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#c9d5ff,transparent)]"></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link href="/" className="flex items-center space-x-3">
            <span className="self-center whitespace-nowrap text-2xl font-semibold gradient-text">
              CourseCraft
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/workspace">
              <Button>
                Get Started
                <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex h-full w-full items-center justify-center pt-24 px-4">
        <div className="container mx-auto flex max-w-6xl flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
          
          {/* Text Content */}
          <div className="text-center md:text-left md:w-1/2">
            <h1
              className="animate-fade-in-up text-5xl font-bold tracking-tight md:text-6xl gradient-text"
              style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
            >
              Learn Smarter. Grow Faster. Powered by AI.
            </h1>
            <p
              className="animate-fade-in-up mt-6 text-lg text-gray-600 md:text-xl"
              style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
            >
              AI customizes your journey with smart lessons, interactive challenges, and feedback that fuels growth.
            </p>
            <div
              className="animate-fade-in-up mt-8"
              style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
            >
              <Link href="/workspace">
                <Button size="lg" className="transition-transform hover:scale-105">
                  Start Learning For Free
                  <MoveRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Feature */}
          <div className="md:w-1/2 w-3/4 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
            <Image
              src="/studying.gif" 
              alt="AI Learning Illustration"
              width={600}
              height={400}
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
