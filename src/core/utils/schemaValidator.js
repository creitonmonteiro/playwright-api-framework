import Ajv from 'ajv';

const ajv = new Ajv ({
  allErrors: true,
  strict: false,
});

export function validateSchema (schema, data) {
  const validate = ajv.compile (schema);

  const valid = validate (data);

  if (!valid) {
    throw new Error (
      `Schema validation error: ${JSON.stringify (validate.errors, null, 2)}`
    );
  }
}
