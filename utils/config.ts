const config: any = {
  BASE: "https://career.amikom.ac.id/",
  BASEAPI:
    process.env.NODE_ENV === "production"
      ? "https://amikom-career-api.vercel.app/api"
      : "http://localhost:3000/api",
};

export default config;
