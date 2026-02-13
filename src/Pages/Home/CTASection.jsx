import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white"
    >
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">
              Ready to send your first parcel?
            </h3>
            <p className="mt-2 text-indigo-100">
              Book a pickup now and enjoy fast, secure delivery.
            </p>
          </div>

          <div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/dashboard/bookAParcel"
                className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:opacity-95 transition"
              >
                Book a Parcel
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
