import Image from "next/image";
import styles from "./LocationCards.module.css";

const locations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=1000", // SF
    location: "1234 Market Street, Suite 500 San Francisco, CA 94103",
    email: "info@example.com",
    phone: "(888) 456 7891"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000", // NY
    location: "123 Green Avenue, New York, NY 10001, United States",
    email: "info@example.com",
    phone: "(888) 456 7892"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=1000", // Singapore
    location: "50 Raffles Place, #32-01, Singapore 048623",
    email: "info@example.com",
    phone: "(888) 456 7893"
  }
];

export default function LocationCards() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Get in touch with our team anytime for fast friendly and reliable services
        </h2>

        <div className={styles.grid}>
          {locations.map((loc) => (
            <div key={loc.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={loc.image}
                  alt="Location"
                  fill
                  className={styles.image}
                />
              </div>
              
              <div className={styles.details}>
                <div className={styles.detailGroup}>
                  <span className={styles.label}>Location</span>
                  <p className={styles.text}>{loc.location}</p>
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
