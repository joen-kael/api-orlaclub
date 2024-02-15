const Yup = require('yup');

const createActivitySchema = Yup.object().shape({
  activity: Yup.string().required('activity obrigatório'),
  describe: Yup.string().required('describe é obrigatório'),
}).noUnknown().strict(true);

const updateActivitySchema = Yup.object().shape({
  activity: Yup.string().optional(),
  describe: Yup.string().optional(),
}).noUnknown().strict(true);

module.exports = { createActivitySchema, updateActivitySchema };



