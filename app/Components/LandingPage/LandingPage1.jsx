import Link from "next/link";
import { Button } from "../../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { Download, Globe, Palette, QrCode, Share2, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  Welcome to LinkerFolio
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
                  Your Ultimate Digital Hub for showcasing your resume and social media links in a professional and seamless manner.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  <Link href="#cta">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 bg-opacity-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Key Features</h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                { icon: Share2, title: "Distinguished Resume", description: "Present yourself in the best light with a stylish design that clearly displays your experience, skills, and education." },
                { icon: Users, title: "Social Link Management", description: "Centralize all your social media links in one place for easy access and sharing with the world." },
                { icon: QrCode, title: "Download and Share QR Code", description: "Get a QR code for your personal page, which you can download and share for easy access to your resume and social media links." },
                { icon: Globe, title: "Automatic Translation", description: "Share your resume with others, who can then translate it into major languages, making it easier for a global audience to understand." },
                { icon: Users, title: "Social Communication", description: "Connect with your friends within the app, facilitating direct and secure interactions in a professional environment." },
                { icon: Palette, title: "Customizable Background Colors", description: "Choose from a variety of background colors to personalize the look of your resume page." }
              ].map((feature, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden group hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                      <feature.icon className="w-5 h-5 mr-2" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="goal" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-900 to-purple-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">LinkerFolio's Goal</h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                LinkerFolio aims to simplify the process of displaying your resume and social media links in one place, making it easier for you to manage your digital identity. Our goal is to enhance your career opportunities and enable you to build a strong and influential digital presence that attracts opportunities and attention from around you.
              </p>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Get Started with LinkerFolio</h2>
              <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                Join LinkerFolio today and take control of your digital presence. Showcase your professional journey and connect with opportunities worldwide.
              </p>
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                <Link href="#">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-900 border-t border-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <p className="text-xs text-gray-400">© 2024 LinkerFolio. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs text-gray-400 hover:text-purple-400 transition-colors" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs text-gray-400 hover:text-purple-400 transition-colors" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}