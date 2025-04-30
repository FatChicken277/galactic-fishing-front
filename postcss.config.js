export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},

    // Run cssnano only in production
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: "default", // Default minification settings
          },
        }
      : {}),
  },
};
