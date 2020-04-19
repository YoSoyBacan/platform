export default {
  email: {
    presence: { allowEmpty: false, message: "es requerido" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "es requerido" },
    length: {
      maximum: 128,
    },
  },
};
