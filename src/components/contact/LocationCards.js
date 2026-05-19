import Image from "next/image";
import styles from "./LocationCards.module.css";

const locations = [
  {
    id: 1,
    image: "/kimg1.png",
    name: "Sawarkar Nagar Campus",
    location: "Sawarkar Nagar, Thane, Maharashtra",
    email: "kidzstarpreprimaryschool@gmail.com",
    phone: "9321002881 / 9323331360",
    mapUrl: "https://maps.app.goo.gl/PymMygndmGV5ndjM9"
  },
  {
    id: 2,
    image: "/kimg2.png",
    name: "Indira Nagar Campus",
    location: "Indira Nagar, Koparkhairane, Navi Mumbai",
    email: "kidzstarpreprimaryschool@gmail.com",
    phone: "7304344802",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=19.102029,73.000208"
  }
];

export default function LocationCards() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Our Campuses
        </h2>

        <div className={styles.grid}>
          {locations.map((loc) => (
            <div key={loc.id} className={styles.card}>
              <a 
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.imageWrapper} block group relative overflow-hidden`}
              >
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className={styles.image}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-bold text-sm gap-2 font-sans">
                  <span>📍 View on Google Maps</span>
                </div>
              </a>
              
              <div className={styles.details}>
                <h3 className="font-sans font-bold text-xl text-neutral-900 mb-1">{loc.name}</h3>

                <div className={styles.detailGroup}>
                  <span className={styles.label}>Location</span>
                  <a 
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-slate-800 hover:text-black transition-colors"
                  >
                    <p className={styles.text}>{loc.location}</p>
                  </a>
                </div>

                <div className={styles.detailGroup}>
                  <span className={styles.label}>Email</span>
                  <p className={styles.text}>{loc.email}</p>
                </div>

                <div className={styles.detailGroup}>
                  <span className={styles.label}>Phone</span>
                  <p className={styles.text}>{loc.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
