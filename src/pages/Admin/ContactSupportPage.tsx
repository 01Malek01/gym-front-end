const ContactSupportPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-800 p-6 md:p-8 text-gray-100 font-sans flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-zinc-900 rounded-xl shadow-2xl p-6 md:p-8 border border-indigo-700 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 uppercase tracking-wide mb-6 pb-4 border-b border-indigo-600">
            Dedicated Support
          </h1>

          <div className="flex flex-col space-y-6 p-6 rounded-lg shadow-xl bg-zinc-800 border border-zinc-700">
            {/* Email Contact */}
            <div className="flex items-center justify-center sm:justify-start bg-zinc-700 p-4 rounded-lg transition-transform duration-200 hover:scale-105 hover:bg-zinc-600">
              {/* <MailIcon className="h-7 w-7 text-indigo-400 mr-4" /> */}
              <span className="text-indigo-400 mr-4 text-3xl">✉️</span> {/* Placeholder for Mail Icon */}
              <div className="text-left">
                <h2 className="font-semibold text-xl text-gray-200 uppercase tracking-wide">Email:</h2>
                <p className="text-lg text-gray-300">
                  <a href="mailto:malekmostafa0051@gmail.com" className="text-teal-300 hover:underline">
                    malekmostafa0051@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Phone Contact */}
            <div className="flex items-center justify-center sm:justify-start bg-zinc-700 p-4 rounded-lg transition-transform duration-200 hover:scale-105 hover:bg-zinc-600">
              {/* <PhoneIcon className="h-7 w-7 text-indigo-400 mr-4" /> */}
              <span className="text-indigo-400 mr-4 text-3xl">📞</span> {/* Placeholder for Phone Icon */}
              <div className="text-left">
                <h2 className="font-semibold text-xl text-gray-200 uppercase tracking-wide">Phone:</h2>
                <p className="text-lg text-gray-300">
                  <a href="tel:+201125485384" className="text-teal-300 hover:underline">
                    +20 11 254 853 84
                  </a>
                </p>
              </div>
            </div>

            {/* Emergency/Availability Support */}
            <div className="flex items-center justify-center sm:justify-start bg-zinc-700 p-4 rounded-lg transition-transform duration-200 hover:scale-105 hover:bg-zinc-600">
              {/* <ClockIcon className="h-7 w-7 text-indigo-400 mr-4" /> */}
              <span className="text-indigo-400 mr-4 text-3xl">🚨</span> {/* Placeholder for Clock/Emergency Icon */}
              <div className="text-left">
                <h2 className="font-semibold text-xl text-gray-200 uppercase tracking-wide">Urgent Assistance:</h2>
                <p className="text-lg text-gray-300">
                  <span className="text-lime-400 font-bold">Available 24/7</span>
                  <span className="block text-sm text-gray-400">For critical issues requiring immediate attention</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactSupportPage;
