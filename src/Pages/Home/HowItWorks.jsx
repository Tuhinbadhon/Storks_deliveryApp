import { motion } from "framer-motion";

const steps = [
  {
    title: "Request a Pickup",
    desc: "Enter package details and preferred pickup time — we’ll handle the rest.",
  },
  {
    title: "Fast & Secure Transit",
    desc: "Real-time tracking and insured transport for every parcel.",
  },
  {
    title: "Delivered on Time",
    desc: "Reliable last-mile delivery with proof-of-delivery options.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="text-center mb-10">
          <h3 className="text-indigo-600 font-semibold">How it works</h3>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Send parcels in 3 easy steps
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            From pickup to delivery — a simple, transparent process so your
            packages get where they need to go, on time.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                {i + 1}
              </div>
              <h4 className="font-semibold text-lg">{s.title}</h4>
              <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
