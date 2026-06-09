// components/Holidays/PackageGrid.jsx

"use client";

import { motion } from "framer-motion";
import PackageCard from "./PackageCard";

export default function PackageGrid({
  packages,
  onBook,
  theme,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {packages.map((pkg, i) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.06,
            duration: 0.5,
          }}
        >
          <PackageCard
            pkg={pkg}
            onBook={onBook}
            theme={theme}
          />
        </motion.div>
      ))}
    </div>
  );
}