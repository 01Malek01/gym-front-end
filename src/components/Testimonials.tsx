import Slider from "react-slick";
import "../styles/testimonials.css";
// Sample testimonials data
const testimonials = [
  {
    name: "Emily Rose",
    text: "Joining this gym changed my life! The trainers are incredible and the facilities are top-notch.",
    role: "Fitness Enthusiast",
  },
  {
    name: "Michael Smith",
    text: "The best gym experience I've ever had. The equipment is well-maintained and the staff is very friendly.",
    role: "Bodybuilder",
  },
  {
    name: "Sarah Johnson",
    text: "Highly recommend! The classes are engaging and I’ve made so much progress in just a few months.",
    role: "Yoga Practitioner",
  },
];

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="testimonials-wrapper py-10 bg-gray-900 text-white">
      <h2 className="text-center text-3xl font-semibold mb-8">
        What Our Members Say
      </h2>
      <div className="max-w-2xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item p-8 text-center">
              <p className="text-lg italic mb-4">"{testimonial.text}"</p>
              <h3 className="text-xl font-medium">{testimonial.name}</h3>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
