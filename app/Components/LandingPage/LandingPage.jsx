"use client"
import Link from "next/link";
import { Button } from "../../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Download,
  Globe,
  Palette,
  QrCode,
  Share2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { data, status } = useSession();
  const Router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      Router.push("/Home");
    }
  }, [status, Router]);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <main className="flex-1">
        <section className="w-full pt-7 pb-12 md:py-20 relative">
          <div className="absolute inset-0 bg-[url('/')] bg-cover bg-center opacity-10"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center md:mx-20 gap-6 lg:gap-12">
              <div className="space-y-4 text-center lg:text-left lg:w-1/2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Unleash{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Your Professional Potential
                  </span>
                </h1>
                <p className="mx-auto lg:mx-0 max-w-[600px] text-slate-300 md:text-xl">
                  With LinkerFolio, gather your resume and social links in one
                  sleek place. Step forward towards limitless career
                  opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:mx-8 justify-center lg:justify-start">
                  <Button
                    asChild
                    onClick={()=>signIn("google", {redirect:true, callbackUrl:`/Home`})}
                    className="cursor-pointer bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
                  >
                    <div >Start for Free</div>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white text-lg px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
                  >
                    <Link href="#features">Watch features</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 relative ">
                <Image
                  src="/Mark_Linkerfolio/Test.png"
                  alt="LinkerFolio Dashboard"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-2xl "
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  Most Popular in 2024
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12  md:py-20  bg-slate-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Why LinkerFolio?
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                   {
                     icon: Share2,
                     title: "Premium Resume",
                     description:
                       "A stylish design that highlights your experience, skills, and education attractively.",
                   },
                   {
                     icon: Users,
                     title: "Social Link Management",
                     description:
                       "Consolidate all your social media links in one place for easy access and sharing.",
                   },
                   {
                     icon: QrCode,
                     title: "Download and Share QR Code",
                     description:
                       "Download and share a QR code for quick access to your resume and social media links.",
                   },
                   {
                     icon: Globe,
                     title: "Automatic Translation",
                     description:
                       "Translate your resume into multiple languages for a global audience.",
                   },
                   {
                     icon: Users,
                     title: "Social Communication",
                     description:
                       "Connect with friends directly and securely within a professional environment.",
                   },
                   {
                     icon: Palette,
                     title: "Customizable Background Colors",
                     description:
                       "Choose from various background colors to personalize the look of your resume page.",
                   },
                 ]
                 .map((feature, index) => (
                <Card
                  key={index}
                  className="bg-slate-700 border-none overflow-hidden group hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center text-emerald-400 group-hover:text-cyan-400 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 mr-2" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300 group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 bg-gradient-to-r from-slate-900 to-slate-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              What Our Customers Say
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  name: "Ahmad Mohammed",
                  role: "Software Developer",
                  comment:
                    "LinkerFolio made it easier for me to showcase my work professionally and helped me secure new job opportunities.",
                },
                {
                  name: "Sara Ali",
                  role: "Graphic Designer",
                  comment:
                    "Finally found a platform that lets me showcase my work in a professional, attractive way.",
                },
                {
                  name: "Mohammed Khaled",
                  role: "Entrepreneur",
                  comment:
                    "Ease of use and elegant design have made LinkerFolio my go-to tool for building professional relationships.",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-slate-800 border-none overflow-hidden hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <p className="text-slate-300 mb-4">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 mr-4"></div>
                      <div>
                        <p className="font-semibold text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-slate-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="w-full hidden py-12  md:py-20 bg-slate-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Choose Your Plan
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  name: "Basic",
                  price: "Free",
                  features: ["1 Resume", "3 Social Links", "PDF Export"],
                },
                {
                  name: "Pro",
                  price: "$9.99/month",
                  features: [
                    "Unlimited Resumes",
                    "Unlimited Social Links",
                    "All Formats Export",
                    "Priority Support",
                  ],
                },
                {
                  name: "Team",
                  price: "$49.99/month",
                  features: [
                    "All Pro Features",
                    "Manage 10 Users",
                    "Advanced Analytics",
                    "Personalized Training",
                  ],
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className={`bg-slate-700 overflow-hidden ${
                    index === 1
                      ? "border-2 border-emerald-500 transform scale-105"
                      : ""
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-emerald-400">
                      {plan.name}
                    </CardTitle>
                    <div className="text-4xl font-bold text-white">
                      {plan.price}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-slate-300">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
                    >
                      <Link href="#get-started">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="goal"
          className="w-full py-12 md:py-20 duration-300 bg-slate-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              LinkerFolio's Goal
            </h2>
            <p className="text-slate-300 text-lg md:text-xl text-center max-w-3xl mx-auto">
              LinkerFolio aims to simplify the process of displaying your resume
              and social media links in one place, making it easier for you to
              manage your digital identity. Our goal is to enhance your career
              opportunities and enable you to build a strong and influential
              digital presence that attracts opportunities and attention from
              around you.
            </p>
          </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-500 to-cyan-500">
  <div className="container px-4 md:px-6 mx-auto text-center">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
      Ready to boost your career?
    </h2>
    <p className="mx-auto max-w-[600px] text-slate-100 md:text-xl mb-8">
      Join thousands of professionals using LinkerFolio to achieve their career goals. Start today and see the difference yourself!
    </p>
    <Button 
      onClick={()=>signIn("google", {redirect:true, callbackUrl:`/Home`})}
      asChild size="lg" className="bg-white cursor-pointer hover:bg-slate-100 text-emerald-600 text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/50">
      <div >Start for free now <ArrowRight className="mr-2 h-5 w-5" /></div>
    </Button>
  </div>
</section>


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
      </main>
    </div>
  );
}
