const ContactSupportPage = () => {
  return (
    <div className="wrapper bg-white p-5 m-5">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-600 mb-6 text-center">
          Developer Contact
        </h1>
        <div className="flex flex-col space-y-4 p-4 pt-2 rounded-lg shadow-md bg-gray-100">
          <div className="flex items-center">
            <h2 className="font-semibold text-gray-600">Email:</h2>
            <p className="ml-2 text-gray-500">malekmostafa0051@gmail.com</p>
          </div>
          <div className="flex items-center">
            <h2 className="font-semibold text-gray-600">Phone:</h2>
            <p className="ml-2 text-gray-500">+20 11 254 853 84</p>
          </div>
          <div className="flex items-center">
            <h2 className="font-semibold text-gray-600">Emergency Support:</h2>
            <p className="ml-2 text-gray-500">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactSupportPage;
