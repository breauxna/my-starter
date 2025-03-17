import * as Joi from 'joi';

const ProductValidator = Joi.object({
  name: Joi.string().min(2).required().trim(),
  price: Joi.number().integer().required().strict(),
  description: Joi.string().min(4).required().trim(),
  imageUrl: Joi.string().uri().required(),
})

export { ProductValidator };
