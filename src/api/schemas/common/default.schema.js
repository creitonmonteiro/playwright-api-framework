export const defaultSchema = {
  type: 'object',
  required: ['message'],
  properties: {
    message: {type: 'string'},
  },
  additionalProperties: true,
};
