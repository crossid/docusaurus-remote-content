import { Joi } from '@docusaurus/utils-validation';

export const PluginOptionSchema = Joi.object({
  cleanup: Joi.boolean(),
  liveFetch: Joi.boolean(),
  type: Joi.string().valid('docs', 'blog'),
  contents: Joi.array().items(
    Joi.object().keys({
      file: Joi.string().required(),
      url: Joi.string().required(),
      header: Joi.string(),
      meta: Joi.object(),
      transform: Joi.function(),
    }),
  ),
});
