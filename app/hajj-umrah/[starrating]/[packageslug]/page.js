import { notFound } from "next/navigation";
import PackageSlider from "@/components/hajjumrah/packagedetails/PackageSlider";
import HolidayInquiryForms from "@/components/Holidays/HolidayInquryForms";

// ─── Inline Styled Components (no extra CSS file needed) ─────────────────────

function StatCard({ label, value, icon, accent }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "28px 24px",
      boxShadow: "0 4px 24px rgba(25,114,159,0.08)",
      border: "1px solid rgba(25,114,159,0.10)",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Mulish', sans-serif",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "80px", height: "80px",
        background: accent === "orange"
          ? "linear-gradient(135deg, rgba(239,147,46,0.12) 0%, rgba(239,147,46,0.04) 100%)"
          : "linear-gradient(135deg, rgba(25,114,159,0.12) 0%, rgba(25,114,159,0.04) 100%)",
        borderRadius: "0 20px 0 80px",
      }} />
      <span style={{
        fontSize: "26px", lineHeight: 1,
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
      }}>{icon}</span>
      <p style={{
        margin: 0, fontSize: "12px", fontWeight: 700,
        letterSpacing: "0.08em", textTransform: "uppercase",
        color: "#94a3b8", fontFamily: "'Mulish', sans-serif",
      }}>{label}</p>
      <p style={{
        margin: 0, fontSize: "22px", fontWeight: 800,
        color: accent === "orange" ? "#EF932E" : "#19729F",
        fontFamily: "'Mulish', sans-serif",
        lineHeight: 1.2,
      }}>{value}</p>
    </div>
  );
}

function HotelCard({ city, hotelName, cityColor }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "24px",
      padding: "36px 32px",
      boxShadow: "0 8px 40px rgba(25,114,159,0.10)",
      border: "1px solid rgba(25,114,159,0.08)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Mulish', sans-serif",
    }}>
      <div style={{
        position: "absolute", top: "-30px", right: "-30px",
        width: "120px", height: "120px", borderRadius: "50%",
        background: cityColor === "orange"
          ? "rgba(239,147,46,0.08)"
          : "rgba(25,114,159,0.08)",
      }} />
      <div style={{
        display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px"
      }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "14px",
          background: cityColor === "orange"
            ? "linear-gradient(135deg, #EF932E, #f5b56a)"
            : "linear-gradient(135deg, #19729F, #2a9fd4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "22px", flexShrink: 0,
          boxShadow: cityColor === "orange"
            ? "0 4px 16px rgba(239,147,46,0.35)"
            : "0 4px 16px rgba(25,114,159,0.35)",
        }}>
          🕌
        </div>
        <div>
          <p style={{
            margin: 0, fontSize: "11px", fontWeight: 800,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: cityColor === "orange" ? "#EF932E" : "#19729F",
          }}>{city}</p>
          <p style={{
            margin: 0, fontSize: "18px", fontWeight: 800,
            color: "#0f172a",
          }}>{city} Hotel</p>
        </div>
      </div>
      <div style={{
        background: cityColor === "orange"
          ? "linear-gradient(135deg, rgba(239,147,46,0.07), rgba(239,147,46,0.03))"
          : "linear-gradient(135deg, rgba(25,114,159,0.07), rgba(25,114,159,0.03))",
        borderRadius: "14px",
        padding: "18px 20px",
        border: cityColor === "orange"
          ? "1px solid rgba(239,147,46,0.15)"
          : "1px solid rgba(25,114,159,0.15)",
      }}>
        <p style={{
          margin: 0, fontSize: "16px", fontWeight: 700, color: "#1e293b",
        }}>{hotelName}</p>
      </div>
    </div>
  );
}

function InclusionItem({ text, type }) {
  return (
    <li style={{
      display: "flex", alignItems: "flex-start", gap: "12px",
      padding: "12px 0",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      fontFamily: "'Mulish', sans-serif",
    }}>
      <div style={{
        width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
        background: type === "included"
          ? "linear-gradient(135deg, #1d1c6b, #142e5f)"
          : "linear-gradient(135deg, #f87171, #ef4444)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "13px", boxShadow: type === "included"
          ? "0 3px 10px rgba(16,185,129,0.3)"
          : "0 3px 10px rgba(239,68,68,0.3)",
      }}>
        {type === "included" ? "✓" : "✕"}
      </div>
      <span style={{
        fontSize: "15px", fontWeight: 600, color: "#334155",
        lineHeight: 1.5, paddingTop: "4px",
      }}>{text}</span>
    </li>
  );
}

function SectionHeading({ children, subtitle }) {
  return (
    <div style={{ marginBottom: "40px", fontFamily: "'Mulish', sans-serif" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "10px",
        background: "linear-gradient(135deg, rgba(239,147,46,0.12), rgba(25,114,159,0.08))",
        borderRadius: "100px",
        padding: "6px 18px 6px 6px",
        marginBottom: "16px",
        border: "1px solid rgba(239,147,46,0.2)",
      }}>
        <div style={{
          width: "24px", height: "24px", borderRadius: "50%",
          background: "linear-gradient(135deg, #EF932E, #19729F)",
        }} />
        <span style={{
          fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "#EF932E",
        }}>{subtitle}</span>
      </div>
      <h2 style={{
        margin: 0, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900,
        color: "#0f172a", lineHeight: 1.1, letterSpacing: "-0.02em",
      }}>{children}</h2>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default async function MasterPackageDetailPage({ params }) {
  const { starrating, packageslug } = await params;
  let currentPackage = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/packages/${packageslug}`,
      { cache: "no-store" }
    );
    if (!res.ok) notFound();
    const data = await res.json();
    currentPackage = data.data;
  } catch (err) {
    console.error("Package fetch error:", err);
    notFound();
  }

  if (!currentPackage) notFound();

  const pageDataBlocks = [
    {
      tagline: "Convenience Without Compromise",
      title: currentPackage.title,
      imageSrc: currentPackage.images?.[0]?.url || "/imgs/hajj/hajj8.jpg",
      imageAlt: currentPackage.title,
      description: <p>{currentPackage.description}</p>,
      listItems: [
        currentPackage.shortDesc,
        `Makkah Hotel: ${currentPackage.makkahHotel}`,
        `Madinah Hotel: ${currentPackage.madinahHotel}`,
        `Duration: ${currentPackage.duration} Nights`,
        "Full ATOL flight protection infrastructure verified",
      ],
    },
  ];

  const stats = [
    { label: "Duration", value: `${currentPackage.duration} Nights`, icon: "🌙", accent: "blue" },
    { label: "Starting Price", value: `£${currentPackage.price?.toLocaleString()}`, icon: "💷", accent: "orange" },
    { label: "Star Rating", value: currentPackage.star?.replace("_", " "), icon: "⭐", accent: "orange" },
    { label: "Departure", value: currentPackage.month || "Any Time", icon: "✈️", accent: "blue" },
  ];
const uniqueInclusions = [
  ...new Map(
    (currentPackage.inclusions || []).map((item) => [
      item.title?.trim().toLowerCase(),
      item,
    ])
  ).values(),
];

const uniqueExclusions = [
  ...new Map(
    (currentPackage.exclusions || []).map((item) => [
      item.title?.trim().toLowerCase(),
      item,
    ])
  ).values(),
];
  return (
    
    <>
      {/* Mulish Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800;900&display=swap');
        
        .pkg-page * { font-family: 'Mulish', sans-serif; box-sizing: border-box; }
        
        .pkg-page {
          background: linear-gradient(180deg, #f0f7fc 0%, #fdf9f5 50%, #f0f7fc 100%);
          min-height: 100vh;
        }

        /* ── Decorative background pattern ── */
        .pkg-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(25,114,159,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(239,147,46,0.04) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .pkg-content { position: relative; z-index: 1; }

        /* ── Stats section ── */
        .stats-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 24px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        /* ── Divider ornament ── */
        .ornament-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 48px 24px 0;
          max-width: 600px;
          margin: 0 auto;
        }
        .ornament-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(239,147,46,0.4), transparent);
        }
        .ornament-diamond {
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #EF932E, #19729F);
          transform: rotate(45deg);
          border-radius: 2px;
          flex-shrink: 0;
        }

        /* ── Hotels section ── */
        .hotels-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 24px;
        }
        .hotels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        /* ── Inclusions section ── */
        .inclusions-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .inclusions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
        }
        .inclusions-card {
          background: #fff;
          border-radius: 28px;
          padding: 40px 36px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.07);
          border: 1px solid rgba(25,114,159,0.08);
        }
        .inclusions-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 2px solid;
        }
        .inclusions-card-header.included { border-color: rgba(16,185,129,0.2); }
        .inclusions-card-header.excluded { border-color: rgba(239,68,68,0.2); }
        .inclusions-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }
        .inclusions-icon.included {
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          box-shadow: 0 4px 16px rgba(16,185,129,0.2);
        }
        .inclusions-icon.excluded {
          background: linear-gradient(135deg, #fef2f2, #fee2e2);
          box-shadow: 0 4px 16px rgba(239,68,68,0.2);
        }
        .inclusions-title {
          font-size: 22px;
          font-weight: 900;
          color: #0f172a;
        }
        .inclusions-subtitle {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 2px;
        }
        .inclusions-subtitle.included { color: #10b981; }
        .inclusions-subtitle.excluded { color: #ef4444; }
        .inclusions-list { list-style: none; padding: 0; margin: 0; }

        /* ── CTA Banner ── */
        .cta-banner {
          max-width: 1280px;
          margin: 0 auto 80px;
          padding: 0 24px;
        }
        .cta-inner {
          background: linear-gradient(135deg, #19729F 0%, #0d4f72 50%, #EF932E 100%);
          border-radius: 32px;
          padding: 60px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
        }
        .cta-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 60%);
        }
        .cta-inner::after {
          content: '☪';
          position: absolute;
          right: 48px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 160px;
          opacity: 0.06;
          color: #fff;
          pointer-events: none;
        }
        .cta-text { position: relative; z-index: 1; }
        .cta-text h3 {
          margin: 0 0 8px;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .cta-text p {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
        }
        .cta-btn {
          position: relative;
          z-index: 1;
          background: #fff;
          color: #19729F;
          border: none;
          border-radius: 100px;
          padding: 16px 40px;
          font-size: 16px;
          font-weight: 900;
          font-family: 'Mulish', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.02em;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
        }

        /* ── Trust badges ── */
        .trust-strip {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #64748b;
          font-size: 14px;
          font-weight: 700;
        }
        .trust-badge-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(239,147,46,0.1), rgba(25,114,159,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border: 1px solid rgba(239,147,46,0.15);
        }

        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .cta-inner { padding: 40px 28px; text-align: center; justify-content: center; }
          .cta-inner::after { display: none; }
        }
      `}</style>

      <div className="pkg-page">
        <div className="pkg-content">

          {/* ── Hero Slider ── */}
          <PackageSlider
            imageSrc={currentPackage.images?.[0]?.url || "/imgs/hajj/hajj8.jpg"}
            imageAlt={currentPackage.title}
            badgeText={`${currentPackage.duration} Nights Special`}
            mainTitle={
              <>
                {currentPackage.title.split("Package")[0]}
                <span style={{
                  background: "linear-gradient(135deg, #EF932E, #19729F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 900,
                }}>
                  Package
                </span>
              </>
            }
            description={`Secure bookings starting at £${currentPackage.price}. Tailored specifically from your nearest UK airport terminal hub.`}
            primaryBtnText="Instant Reservation"
            formComponent={<HolidayInquiryForms formType="umrah" />}
          />

          {/* ── Stats Cards ── */}
          <section className="stats-section">
            <div className="stats-grid">
              {stats.map((s, i) => (
                <StatCard key={i} {...s} />
              ))}
            </div>
          </section>

          {/* ── Ornamental Divider ── */}
          <div className="ornament-divider">
            <div className="ornament-line" />
            <div className="ornament-diamond" />
            <div className="ornament-diamond" style={{ background: "linear-gradient(135deg, #19729F, #EF932E)", transform: "rotate(45deg) scale(1.5)" }} />
            <div className="ornament-diamond" />
            <div className="ornament-line" />
          </div>

          {/* ── Hotel Information ── */}
          <section className="hotels-section">
            <SectionHeading subtitle="Accommodation">
              Your Sacred<br />
              <span style={{
                background: "linear-gradient(135deg, #EF932E 30%, #19729F 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Stays
              </span>
            </SectionHeading>

            <div className="hotels-grid">
              <HotelCard
                city="Makkah"
                hotelName={currentPackage.makkahHotel}
                cityColor="orange"
              />
              <HotelCard
                city="Madinah"
                hotelName={currentPackage.madinahHotel}
                cityColor="blue"
              />
            </div>
          </section>

          {/* ── Inclusions & Exclusions ── */}
         {/* ── Inclusions & Exclusions ── */}
<section className="inclusions-section">
  <SectionHeading subtitle="Package Details">
    What&rsquo;s{" "}
    <span
      style={{
        background: "linear-gradient(135deg, #EF932E 30%, #19729F 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      Included
    </span>{" "}
    &amp; Excluded
  </SectionHeading>

  <div className="inclusions-grid">
    {/* Included */}
    <div className="inclusions-card">
      <div className="inclusions-card-header included">
        <div className="inclusions-icon included">✈️</div>
        <div>
          <div className="inclusions-title">What&rsquo;s Included</div>
          <div className="inclusions-subtitle included">
            {uniqueInclusions.length} benefits included
          </div>
        </div>
      </div>

      <ul className="inclusions-list">
        {uniqueInclusions.length > 0 ? (
          uniqueInclusions.map((item, index) => (
            <InclusionItem
              key={`inc-${item.id}-${index}`}
              text={item.title}
              type="included"
            />
          ))
        ) : (
          <li
            style={{
              padding: "12px 0",
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            No inclusions available.
          </li>
        )}
      </ul>
    </div>

    {/* Excluded */}
    <div className="inclusions-card">
      <div className="inclusions-card-header excluded">
        <div className="inclusions-icon excluded">📋</div>
        <div>
          <div className="inclusions-title">What&rsquo;s Excluded</div>
          <div className="inclusions-subtitle excluded">
            {uniqueExclusions.length} items not covered
          </div>
        </div>
      </div>

      <ul className="inclusions-list">
        {uniqueExclusions.length > 0 ? (
          uniqueExclusions.map((item, index) => (
            <InclusionItem
              key={`exc-${item.id}-${index}`}
              text={item.title}
              type="excluded"
            />
          ))
        ) : (
          <li
            style={{
              padding: "12px 0",
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            No exclusions available.
          </li>
        )}
      </ul>
    </div>
  </div>
</section>

          {/* ── CTA Banner ── */}
          <div className="cta-banner">
            <div className="cta-inner">
              <div className="cta-text">
                <h3>Ready to Begin Your Sacred Journey?</h3>
                <p>Speak with our Umrah specialists — available 7 days a week</p>
              </div>
             <a href="/contact" className="cta-link">
                <button className="cta-btn">Book Now from £{currentPackage.price}</button>
              </a>
            </div>
          </div>

          {/* ── Trust Strip ── */}
          <div className="trust-strip">
            {[
              { icon: "🛡️", text: "ATOL Protected" },
              { icon: "🏅", text: "ABTA Member" },
              { icon: "⭐", text: "5-Star Rated" },
              { icon: "💬", text: "24/7 Support" },
              { icon: "🔒", text: "Secure Booking" },
            ].map((b, i) => (
              <div className="trust-badge" key={i}>
                <div className="trust-badge-icon">{b.icon}</div>
                <span>{b.text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}