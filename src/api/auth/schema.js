const Yup = require('yup');

const authSchema = Yup.object().shape({
  email: Yup.string().email('Formato de e-mail inválido').required('email obrigatório'),
  password: Yup.string().required('password é obrigatório'),
}).noUnknown().strict(true);

module.exports = authSchema



