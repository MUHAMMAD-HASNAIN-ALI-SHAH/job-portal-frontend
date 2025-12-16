const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Find Your Dream Job With Confidence
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Search thousands of jobs, connect with top companies, and take the
            next step in your career journey.
          </p>

          {/* Search Box */}
          <div className="bg-gray-100 border p-2 px-4 rounded-xl flex flex-col sm:flex-row gap-3 mt-6">
            <input
              type="text"
              placeholder="Job title or keyword"
              className="flex-1 rounded-md focus:outline-none"
            />
            <input
              type="text"
              placeholder="Location"
              className="flex-1 rounded-md focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
            <p className="text-gray-600">Job Seekers</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-blue-600">1K+</h2>
            <p className="text-gray-600">Companies</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-blue-600">5K+</h2>
            <p className="text-gray-600">Jobs Posted</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-blue-600">95%</h2>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURE SECTION ================= */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Job Portal?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Verified Companies
              </h3>
              <p className="text-gray-600">
                We only allow trusted and verified companies to post jobs on our
                platform.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Easy Resume Upload
              </h3>
              <p className="text-gray-600">
                Upload your resume once and apply to multiple jobs with one
                click.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Smart Job Matching
              </h3>
              <p className="text-gray-600">
                Get job recommendations based on your skills and experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOB LIST (EMPTY STATE) ================= */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Latest Job Opportunities
          </h2>

          <p className="text-gray-600 mb-10">
            New jobs will appear here once companies start posting.
          </p>

          {/* Empty State */}
          <div className="bg-white p-12 rounded-xl shadow flex flex-col items-center gap-4">
            <img
              src="/no-jobs.svg"
              alt="No jobs"
              className="w-32 opacity-70"
            />
            <h3 className="text-xl font-semibold">No Jobs Available</h3>
            <p className="text-gray-500 max-w-md">
              There are currently no job postings. Please check back later or
              update your profile to receive notifications.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Take the Next Step?
          </h2>

          <p className="text-blue-100 max-w-2xl mx-auto">
            Create your profile, upload your resume, and start applying for jobs
            today.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
              Create Profile
            </button>
            <button className="border border-white px-6 py-3 rounded-md hover:bg-blue-700">
              Browse Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Job Portal
            </h3>
            <p className="text-sm text-gray-400">
              A modern job portal helping candidates and companies connect
              efficiently.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              For Job Seekers
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Find Jobs</li>
              <li>Create Profile</li>
              <li>Upload Resume</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              For Employers
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Post Jobs</li>
              <li>Manage Applications</li>
              <li>Hire Talent</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          © 2025 Job Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
