import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { TECH_SKILLS } from "../lib/fieldsdata";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white text-slate-800">
        {/* ================= HERO ================= */}
        <section className="bg-slate-50 py-24">
          <div className="max-w-6xl mx-auto px-6 text-center flex flex-col gap-6">
            <span className="inline-flex w-fit mx-auto items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
              Launching soon
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              A smarter way to build your career
            </h1>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We're building a modern job portal that helps candidates showcase
              their skills and enables companies to hire the right talent —
              faster and smarter.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <a
                href="/register"
                className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
              >
                Get started
              </a>
              <a
                href="#about"
                className="border border-slate-300 px-8 py-3 rounded-md font-medium hover:bg-slate-100 transition-colors"
              >
                Learn more
              </a>

            </div>
          </div>
        </section>

        {/* ================= ABOUT PLATFORM ================= */}
        <section id="about" className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-slate-900">
                Built for job seekers and employers
              </h2>
              <p className="text-slate-600">
                Our platform is designed to simplify the hiring process. Whether
                you're a student, a professional, or a company, everything is
                built to be easy, fast, and reliable.
              </p>
              <p className="text-slate-600">
                From profile creation to resume management, we focus on
                delivering a clean, efficient experience on both sides of the
                hire.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-10">
              <ul className="flex flex-col gap-4 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full shrink-0"></span>
                  Secure user profiles
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full shrink-0"></span>
                  Resume upload and management
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full shrink-0"></span>
                  Company dashboards
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full shrink-0"></span>
                  Scalable, modern architecture
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="bg-slate-50 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-14">
              Platform highlights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border-l-2 border-indigo-600 p-8 rounded-r-xl">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Modern UI and UX
                </h3>
                <p className="text-slate-600">
                  Clean layouts, responsive design, and smooth interactions
                  built with modern technologies.
                </p>
              </div>

              <div className="bg-white border-l-2 border-indigo-600 p-8 rounded-r-xl">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Secure and reliable
                </h3>
                <p className="text-slate-600">
                  We prioritize data security and scalability to keep every
                  user's experience safe.
                </p>
              </div>

              <div className="bg-white border-l-2 border-indigo-600 p-8 rounded-r-xl">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Career focused
                </h3>
                <p className="text-slate-600">
                  Everything is designed to help users grow professionally and
                  present themselves better.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HIRING FIELDS ================= */}
        <section id="fields" className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Hiring open across these technical fields
            </h2>

            <p className="text-slate-600 max-w-3xl mx-auto mb-10">
              Companies are actively hiring skilled professionals in these
              technical areas and much more. Explore opportunities and prepare
              yourself for roles in high-demand domains.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {TECH_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-indigo-600 py-24">
          <div className="max-w-6xl mx-auto px-6 text-center flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Your career platform is coming soon
            </h2>

            <p className="text-indigo-100 max-w-2xl mx-auto">
              Create your account today and be ready when new features and
              opportunities launch.
            </p>

            <div className="flex justify-center gap-4">
              <a
                href="/register"
                className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors"
              >
                Create account
              </a>
              <a
                href="#about"
                className="border border-white text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Contact us
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