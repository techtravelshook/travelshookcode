"use client";

import { motion } from "framer-motion";
import {
  Plane,
  ShieldCheck,
  Globe2,
  Clock3,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

const features = [
  {
    icon: Globe2,
    title: "Worldwide Destinations",
    desc: "Exclusive flight deals across Asia, Europe, Africa, Australia, North & South America.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Certified",
    desc: "Protected by industry-leading standards with IATA, ABTA & ATOL compliance.",
  },
  {
    icon: Clock3,
    title: "Hold The Fare",
    desc: "Lock your fare for up to 48 hours and book when you're ready.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    desc: "Affordable installment plans and low-deposit booking options.",
  },
];

export default function AboutFlights() {
  return (
    <section className="text-Mulish relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Blur */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="container mx-auto px-4 py-20 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-8xl "
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 dark:border-orange-900 dark:bg-orange-950/40">
            <Plane size={16} />
            Trusted Flight Specialists
          </span>

          <h2 className=" text-4xl font-bold leading-tight text-slate-900 md:text-5xl dark:text-white">
            Discover The World With
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              {" "}
              TravelsHook
            </span>
          </h2>

          <p className=" text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            For over a decade, we&apos;ve helped thousands of travelers secure
            exceptional flight deals.
          </p>
        </motion.div>

        {/* First Section */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src="/imgs/flights/fl1.jpg"
              alt="Travel Adventure"
              className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
            />

            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-green-500" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    10+ Years Experience
                  </h4>
                  <p className="text-sm text-slate-500">
                    Trusted by thousands of travelers
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-semibold text-orange-500">
              LET&apos;S GO ON AN ADVENTURE
            </span>

            <h3 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              Connecting You To Every Corner Of The Globe
            </h3>

            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
              TravelsHook delivers highly competitive prices on global flights,
              tailor-made holidays, and all-inclusive travel packages. Serving
              travelers throughout England, Scotland, Wales, and Northern
              Ireland, we focus on providing seamless travel experiences with
              exceptional value.
            </p>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              Whether you're planning a family holiday, visiting loved ones, or
              arranging a business trip, our travel specialists work tirelessly
              to secure the best possible fares while maintaining comfort,
              flexibility, and convenience.
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <div className="my-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 transition-all group-hover:scale-110 dark:bg-orange-950/50">
                <item.icon size={26} />
              </div>

              <h4 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h4>

              <p className="leading-7 text-slate-600 dark:text-slate-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Second Section */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-semibold text-orange-500">
              WHY CHOOSE TRAVELSHOOK
            </span>

            <h3 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              Secure, Flexible & Designed Around You
            </h3>

            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
              Our Hold The Fare feature allows you to secure today's price for
              up to 48 hours, giving you time to finalize plans without missing
              out on exceptional deals.
            </p>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              Through strong airline partnerships, flexible payment plans, and
              dedicated travel support, we make premium travel accessible and
              stress-free for every customer.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["IATA Protected", "ABTA Member", "ATOL Protected", "24/7 Support"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 dark:bg-orange-950/40 dark:text-orange-300"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/imgs/flights/fl2.jpg"
              alt="Travel Services"
              className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
            />

            <div className="absolute right-6 top-6 rounded-2xl bg-white/90 p-5 backdrop-blur-xl shadow-xl dark:bg-slate-900/90">
              <h4 className="text-2xl font-bold text-orange-500">
                Thousands
              </h4>
              <p className="text-sm text-slate-500">
                Happy Travelers Worldwide
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        
      </div>
    </section>
  );
}