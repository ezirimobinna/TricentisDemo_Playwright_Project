import { faker } from '@faker-js/faker';


export function createUniqueUser() {
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    firstName: 'Amos',
    lastName: 'Dave',
    email: `amos.dave.${id}@gmail.com`,
    password: 'Password123!'
  };
}

export function createCheckoutData() {
  return {
    country: '2',
    city: faker.location.city(),
    address: faker.location.streetAddress(),
    postalCode: faker.location.zipCode(),
    phone: faker.phone.number()
  };
}