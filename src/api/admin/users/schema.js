const Yup = require('yup');

const createUserSchema = Yup.object().shape({
  email: Yup.string().email('Formato de e-mail inválido').required('email obrigatório'),
  name: Yup.string().required('name é obrigatório'),
  describe: Yup.string().required('describe é obrigatório'),
  password: Yup.string().required('password é obrigatório'),
}).noUnknown().strict(true);

const updateUserSchema = Yup.object().shape({
  email: Yup.string().email('Formato de e-mail inválido').optional(),
  name: Yup.string().optional(),
  describe: Yup.string().optional(),
  password: Yup.string().optional(),
}).noUnknown().strict(true);

module.exports = { createUserSchema, updateUserSchema };


