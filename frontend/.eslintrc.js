module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
