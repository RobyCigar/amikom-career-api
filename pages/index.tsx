import Link from "next/link";

export default function Index() {
  return (
    <main style={styles.container}>
      <div>
        <h1 style={{ fontSize: "5rem", color: "#622398" }}>
          Amikom Career API
        </h1>
        <table cellSpacing="20">
          <tr>
            <td>Root Endpoint</td>
            <td>
              <a href="api/" target="_blank">
                <span>{"{BASE_URL}"}/api/</span>
              </a>
            </td>
          </tr>
          <tr>
            <td>Dokumentasi</td>
            <td>
              <Link href="https://github.com/RobyCigar/amikom-career-api">
                https://github.com/RobyCigar/amikom-career-api
              </Link>
            </td>
          </tr>
          <tr>
            <td>Created by</td>
            <td>
              <Link href="https://github.com/RobyCigar" passHref={true}>
                https://github.com/RobyCigar
              </Link>
            </td>
          </tr>
        </table>
        <br />
        <br />
      </div>
    </main>
  );
}

const styles: any = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
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
