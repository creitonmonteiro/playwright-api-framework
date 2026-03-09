export const findUserSchema = {
  type: 'object',
  required: ['_id', 'email', 'password'],
  properties: {
    _id: {type: 'string'},
    email: {type: 'string'},
    password: {type: 'string'},
  },
};
