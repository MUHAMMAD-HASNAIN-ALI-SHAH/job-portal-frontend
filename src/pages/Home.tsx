const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* ================= HERO ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            A Smarter Way to Build Your Career
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are building a modern job portal that helps candidates showcase
            their skills and enables companies to hire the right talent — faster
            and smarter.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
              Get Started
            </button>
            <button className="border border-gray-300 px-8 py-3 rounded-md hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT PLATFORM ================= */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">
              Built for Job Seekers & Employers
            </h2>
            <p className="text-gray-600">
              Our platform is designed to simplify the hiring process. Whether
              you're a student, a professional, or a company — everything is
              crafted to be easy, fast, and reliable.
            </p>
            <p className="text-gray-600">
              From profile creation to resume management, we focus on providing
              clean and efficient user experiences.
            </p>
          </div>

          <div className="bg-white rounded-xl p-10 shadow">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Secure user profiles
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Resume upload & management
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Company dashboards
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Scalable & modern architecture
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Platform Highlights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Modern UI & UX</h3>
              <p className="text-gray-600">
                Clean layouts, responsive design, and smooth interactions built
                with modern technologies.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                We prioritize data security and scalability to ensure a safe
                experience for all users.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Career Focused</h3>
              <p className="text-gray-600">
                Everything is designed to help users grow professionally and
                present themselves better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Built with Modern Technologies
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-10">
            This platform is developed using industry-standard tools to ensure
            performance, scalability, and maintainability.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Frontend */}
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              HTML5
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              CSS3
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              JavaScript
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              TypeScript
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              React
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Next.js
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Tailwind CSS
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Responsive Design
            </span>

            {/* Backend */}
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Node.js
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Express.js
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              REST APIs
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              JWT Authentication
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Role-Based Access
            </span>

            {/* Databases */}
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              MongoDB
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Mongoose
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              SQL Basics
            </span>

            {/* Cloud & Storage */}
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Cloudinary
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              AWS S3
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Azure Blob Storage
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              File Upload Handling
            </span>

            {/* Tools */}
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Git
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              GitHub
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Postman
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              VS Code
            </span>

            {/* Concepts */}
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              MVC Architecture
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              API Security
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              State Management
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Zustand
            </span>
            <span className="bg-white px-6 py-3 rounded-full shadow text-sm">
              Performance Optimization
            </span>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Your Career Platform Is Coming Soon
          </h2>

          <p className="text-blue-100 max-w-2xl mx-auto">
            Create your account today and be ready when new features and
            opportunities are launched.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100">
              Create Account
            </button>
            <button className="border border-white px-8 py-3 rounded-md hover:bg-blue-700">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
