import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Fast, reliable and the tracking is excellent — my packages always arrive on time.",
    name: "Sarah J.",
    role: "Small Business Owner",
  },
  {
    quote: "Great customer service and affordable rates. Highly recommended!",
    name: "Mark T.",
    role: "E‑commerce Seller",
  },
  {
    quote: "Smooth pickup and delivery process — very professional team.",
    name: "Priya R.",
    role: "Freelancer",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="text-center mb-8">
          <h3 className="text-xl uppercase  mb-10 lg:text-3xl font-bold text-center relative pb-2">
            Testimonials
            <span className="custom-border absolute left-1/2 transform -translate-x-1/2 bottom-0 lg:w-64  w-52"></span>
          </h3>
          <h2 className="text-2xl sm:text-3xl font-bold">
            What our customers say
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 bg-white rounded-lg shadow"
            >
              <p className="text-gray-700">“{t.quote}”</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
