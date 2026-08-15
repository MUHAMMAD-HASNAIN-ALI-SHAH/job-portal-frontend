import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { TECH_SKILLS } from "../lib/fieldsdata";
import {
  Briefcase,
  Building2,
  Users,
  FileText,
  Search,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="bg-white text-slate-800">

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]" />
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center">

              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-2 text-sm text-white">
                🚀 Next Generation Hiring Platform
              </span>

              <h1 className="mt-8 text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                Find Jobs.
                <br />
                Build Careers.
              </h1>

              <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-indigo-100">
                Connect talented professionals with top companies through a
                modern hiring platform designed for speed, growth and success.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/register"
                  className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition"
                >
                  Get Started
                </a>

                <a
                  href="#about"
                  className="border border-white/40 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h3 className="text-3xl font-bold text-white">500+</h3>
                  <p className="text-indigo-100 mt-2">Active Jobs</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h3 className="text-3xl font-bold text-white">100+</h3>
                  <p className="text-indigo-100 mt-2">Companies</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h3 className="text-3xl font-bold text-white">10k+</h3>
                  <p className="text-indigo-100 mt-2">Candidates</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <h2 className="text-4xl font-bold text-slate-900">
                Built for Job Seekers & Employers
              </h2>

              <p className="mt-5 text-slate-600 leading-relaxed">
                Whether you're searching for your next opportunity or hiring
                top talent, our platform simplifies every step of the process.
              </p>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Create profiles, upload resumes, post jobs, manage applicants
                and grow your career all in one place.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8">
              <div className="space-y-5">
                {[
                  "Secure User Profiles",
                  "Resume Upload & Management",
                  "Company Dashboards",
                  "Modern & Scalable Architecture",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <CheckCircle className="h-5 w-5 text-indigo-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center mb-14">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
                <Users className="mx-auto h-10 w-10 text-indigo-600" />
                <h3 className="mt-5 font-semibold">Create Profile</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Sign up and build your professional profile.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
                <FileText className="mx-auto h-10 w-10 text-indigo-600" />
                <h3 className="mt-5 font-semibold">Upload Resume</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Keep your latest resume ready.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
                <Search className="mx-auto h-10 w-10 text-indigo-600" />
                <h3 className="mt-5 font-semibold">Find Jobs</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Search jobs matching your skills.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
                <Briefcase className="mx-auto h-10 w-10 text-indigo-600" />
                <h3 className="mt-5 font-semibold">Get Hired</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Apply and land your dream role.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center mb-14">
              Platform Highlights
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-white border rounded-3xl p-8 hover:shadow-xl transition">
                <h3 className="font-semibold text-xl mb-3">
                  Modern UI & UX
                </h3>
                <p className="text-slate-600">
                  Beautiful design with smooth user experience.
                </p>
              </div>

              <div className="bg-white border rounded-3xl p-8 hover:shadow-xl transition">
                <h3 className="font-semibold text-xl mb-3">
                  Secure & Reliable
                </h3>
                <p className="text-slate-600">
                  Enterprise-grade security and performance.
                </p>
              </div>

              <div className="bg-white border rounded-3xl p-8 hover:shadow-xl transition">
                <h3 className="font-semibold text-xl mb-3">
                  Career Focused
                </h3>
                <p className="text-slate-600">
                  Built to help professionals grow faster.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= CANDIDATES VS EMPLOYERS ================= */}
        <section className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-6">

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white rounded-3xl p-8 border">
                <Users className="h-10 w-10 text-indigo-600 mb-4" />

                <h3 className="text-2xl font-bold mb-4">
                  For Candidates
                </h3>

                <ul className="space-y-3 text-slate-600">
                  <li>✓ Create Professional Profile</li>
                  <li>✓ Upload Resume</li>
                  <li>✓ Apply Faster</li>
                  <li>✓ Track Applications</li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 border">
                <Building2 className="h-10 w-10 text-indigo-600 mb-4" />

                <h3 className="text-2xl font-bold mb-4">
                  For Employers
                </h3>

                <ul className="space-y-3 text-slate-600">
                  <li>✓ Post Jobs</li>
                  <li>✓ Manage Applicants</li>
                  <li>✓ Company Dashboard</li>
                  <li>✓ Hiring Analytics</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ================= SKILLS ================= */}
        <section id="fields" className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-bold mb-6">
              Popular Technology Skills
            </h2>

            <p className="text-slate-600 max-w-3xl mx-auto mb-10">
              Explore opportunities across the most in-demand technologies.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {TECH_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 font-medium hover:scale-105 transition"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-gradient-to-r from-indigo-700 to-violet-700 py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Start Your Journey?
            </h2>

            <p className="mt-5 text-indigo-100">
              Join thousands of professionals and companies building their future.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/register"
                className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold"
              >
                Create Account
              </a>

              <a
                href="/jobs"
                className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white/10"
              >
                Browse Jobs
              </a>
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default Home;
