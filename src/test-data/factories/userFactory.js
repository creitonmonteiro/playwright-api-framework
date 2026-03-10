import {faker} from '@faker-js/faker';

export function createUserPayload () {
  return {
    name: faker.person.fullName (),
    email: faker.internet.email (),
    password: faker.internet.password (),
  };
}

export function falseLoginPayload () {
  return {
    email: faker.internet.email (),
    password: faker.internet.password (),
  };
}
