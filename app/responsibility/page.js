import Image from 'next/image';
import Link from 'next/link';

export default function OurResponsibility() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Visual Hero Header */}
      <div className="relative h-[340px] sm:h-[400px] md:h-[460px] overflow-hidden">
        <Image
          src="/imgs/hajj/hajj22.jpg"
          alt="Travel Hooks supporting communities through ethical and social responsibility initiatives"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dynamic gradient: vertical fallback overlay on small mobile screens to keep text legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 sm:pt-14">
            <span className="inline-block rounded-full bg-orange-500 px-3 py-1 text-xs sm:text-sm font-semibold text-white tracking-wide">
              Corporate Values
            </span>

            <h1 className="mt-4 text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Our Social, Corporate & Ethical Responsibility
            </h1>

            <p className="mt-3 max-w-2xl text-white/90 text-sm sm:text-base md:text-lg font-medium">
              Creating meaningful travel experiences while supporting communities,
              maintaining ethical business practices, and making a positive impact
              around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Main Body Content Text */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-gray-700 dark:text-gray-200 leading-relaxed text-sm sm:text-base">
        {/* Intro Paragraph */}
        <p className="mb-8 font-medium text-base sm:text-lg text-gray-900 dark:text-white">
          <span className="text-orange-400 dark:text-orange-300 font-bold">Travelshook</span> has always considered social 
          and corporate responsibility as basic components of its business strategy. All the commitments 
          are for support across various domains, based on our credible mission and vision to transform 
          society and maintain ethical business practices.
        </p>

        {/* Section 1: Social Responsibility */}
        <section className="mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-sky-800 dark:text-sky-400 mb-4 tracking-tight">
            Social Responsibility
          </h2>
          <div className="space-y-4">
            <p>
              Travelshook company is involved in helping society by pulling the society weight during 
              calamities such as natural disasters that encompass earthquakes, floods, and cracks of volcanoes. 
              We quickly opened shelter camps for the affected and worked with NGOs and social workers.
            </p>
            <p>
              Being very open to external input, we are interested in ideas from customers, business partners, 
              and interested parties who are generally not part of our organization. This promotes collaborative 
              action for positive change. Those willing to volunteer to us for social causes can liaise with our 
              Helping Hands to be directed on how to join us.
            </p>
          </div>
        </section>

        {/* Section 2: Corporate Responsibility and Business Ethics */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-sky-800 dark:text-sky-400 mb-4 tracking-tight">
            Corporate Responsibility and Business Ethics
          </h2>
          <div className="space-y-4">
            <p>
              At Travelshook, we believe in and are dedicated to corporate responsibility with high business 
              ethics. We guarantee compliance with laws and try to allow the population to use our services 
              internationally while maintaining business ethics.
            </p>
            <p>
              We are concerned with travelers and tourists contentment and safety, guaranteeing a pleasant 
              travel experience. Being open to communicating with our customer base immediately, we meet their 
              concerns or problems that affect their travel experience and, thus, prove responsible corporate 
              practices.
            </p>
            <p>
              Travelshook is convinced that ethical business behavior and shared responsibility will likely 
              make a positive shift in travel and tourism
              
              . Be a part of our journey to take this progress a notch higher, serve the hospitality world 
              more effectively, and make each travel experience more responsible to humanity.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
