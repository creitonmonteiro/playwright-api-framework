export const errorSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: {type: 'string'},
  },
  additionalProperties: true,
};
