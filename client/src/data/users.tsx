import { Order } from 'data/orders';

export type User = {
  id: string;
  name: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    zipCode: string;
  };
  email: string;
  phone: string;
  avatarUrl: string;
  createdAt: 1555016400000;
  acceptedCookies: boolean;
  orders?: Order[];
  orderIds: string[];
  interests: string[];
  returning: boolean;
  moneySpent?: number;
};

export default [
  {
    id: 'DEV705225',
    name: 'Ekaterina Tankova',
    address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street',
      zipCode: '26101'
    },
    email: 'ekaterina.tankova@devias.io',
    phone: '304-428-3097',
    avatarUrl: '/images/avatars/avatar_1.png',
    createdAt: 1555016400000,
    acceptedCookies: false,
    orderIds: ['DEV730658'],
    interests: ['ReactJS'],
    returning: false
  },
  {
    id: 'DEV696649',
    name: 'Cao Yu',
    address: {
      country: 'USA',
      state: 'Bristow',
      city: 'Iowa',
      street: '1865  Pleasant Hill Road',
      zipCode: '50611'
    },
    email: 'cao.yu@devias.io',
    avatarUrl: '/images/avatars/avatar_1.png',
    phone: '712-351-5711',
    createdAt: 1555016400000,
    acceptedCookies: false,
    orderIds: ['DEV898812'],
    interests: ['ReactJS', 'Angular'],
    returning: false
  },
  {
    id: 'DEV626247',
    name: 'Alexa Richardson',
    address: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta',
      street: '4894  Lakeland Park Drive',
      zipCode: '30303'
    },
    email: 'alexa.richardson@devias.io',
    phone: '770-635-2682',
    avatarUrl: '/images/avatars/avatar_1.png',
    createdAt: 1555016400000,
    acceptedCookies: true,
    orderIds: [],
    interests: ['VueJS'],
    returning: false
  },
  {
    id: 'DEV702967',
    name: 'Anje Keizer',
    address: {
      country: 'USA',
      state: 'Ohio',
      city: 'Dover',
      street: '4158  Hedge Street',
      zipCode: '44622'
    },
    email: 'anje.keizer@devias.io',
    avatarUrl: '/images/avatars/avatar_1.png',
    phone: '908-691-3242',
    createdAt: 1554930000000,
    acceptedCookies: true,
    orderIds: ['DEV793788'],
    interests: ['HTML'],
    returning: true
  },
  {
    id: 'DEV663348',
    name: 'Clarke Gillebert',
    address: {
      country: 'USA',
      state: 'Texas',
      city: 'Dallas',
      street: '75247',
      zipCode: '715 Poco Mas Drive'
    },
    email: 'clarke.gillebert@devias.io',
    phone: '972-333-4106',
    avatarUrl: '/images/avatars/avatar_1.png',

    createdAt: 1554757200000,
    acceptedCookies: true,
    orderIds: ['DEV841788'],
    interests: ['ReactJS', 'EmberJS'],
    returning: true
  },
  {
    id: 'DEV728981',
    name: 'Adam Denisov',
    address: {
      country: 'USA',
      state: 'California',
      city: 'Bakerfield',
      street: '317 Angus Road',
      zipCode: '93308'
    },
    email: 'adam.denisov@devias.io',
    phone: '858-602-3409',
    avatarUrl: '/images/avatars/avatar_1.png',
    bio: 'Developer',
    createdAt: 1554670800000,
    acceptedCookies: true,
    orderIds: ['DEV552540'],
    interests: ['ReactJS', 'VueJS'],
    returning: false
  },
  {
    id: 'DEV883167',
    name: 'Ava Gregoraci',
    address: {
      country: 'USA',
      state: 'California',
      city: 'Redondo Beach',
      street: '2188  Armbrester Drive',
      zipCode: '90278'
    },
    email: 'ava.gregoraci@devias.io',
    avatarUrl: '/images/avatars/avatar_1.png',
    phone: '415-907-2647',
    createdAt: 1554325200000,
    acceptedCookies: true,
    orderIds: ['DEV593146', 'DEV783653'],
    interests: ['NextJS'],
    returning: false
  },
  {
    id: 'DEV714786',
    name: 'Emilee Simchenko',
    address: {
      country: 'USA',
      state: 'Nevada',
      city: 'Las Vegas',
      street: '1798  Hickory Ridge Drive',
      zipCode: '89101'
    },
    email: 'emilee.simchenko@devias.io',
    phone: '702-661-1654',
    avatarUrl: '/images/avatars/avatar_1.png',
    createdAt: 1523048400000,
    acceptedCookies: true,
    orderIds: [],
    interests: ['GatsbyJS'],
    returning: false
  },
  {
    id: 'DEV869812',
    name: 'Kwak Seong-Min',
    address: {
      country: 'USA',
      state: 'Michigan',
      city: 'Detroit',
      street: '3934  Wildrose Lane',
      zipCode: '48224'
    },
    email: 'kwak.seong.min@devias.io',
    avatarUrl: '/images/avatars/avatar_1.png',
    phone: '313-812-8947',
    createdAt: 1522875600000,
    acceptedCookies: true,
    orderIds: [],
    interests: ['Apollo GraphQL'],
    returning: true
  },
  {
    id: 'DEV662801',
    name: 'Merrile Burgett',
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road',
      zipCode: '84111'
    },
    email: 'merrile.burgett@devias.io',
    phone: '801-301-7894',
    avatarUrl: '/images/avatars/avatar_1.png',
    createdAt: 1522702800000,
    acceptedCookies: false,
    orderIds: [],
    interests: ['Angular'],
    returning: true
  }
] as User[];
