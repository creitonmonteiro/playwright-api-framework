export const getProductSchema = {
  type: 'object',
  required: ['nome', 'preco', 'descricao', 'quantidade', '_id'],
  properties: {
    nome: {type: 'string'},
    preco: {type: 'int'},
    descricao: {type: 'string'},
    preco: {type: 'int'},
    _id: {type: 'string'},
  },
};