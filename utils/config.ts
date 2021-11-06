const config: any = {
  BASE: "https://career.amikom.ac.id/",
  BASEAPI:
    process.env.NODE_ENV === "production"
      ? "https://amikom-carrer-api.vercel.app"
      : "http://localhost:3000/api/",
};

export default config;
