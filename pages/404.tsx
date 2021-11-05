import Link from "next/link";
import { useRef, useEffect } from "react";

export default function Page404() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.p}>
        Kamu cari apa hyung? coba deh{" "}
        <span style={styles.link}>
          <Link href="/">kesini</Link>
        </span>{" "}
        aja{" "}
      </p>
    </div>
  );
}

const styles: any = {
  title: {
    fontSize: "150px",
    color: "#f00",
  },
  link: {
    color: "#0070f3",
  },
  p: {
    fontSize: 20,
  },
};
