import { IResolvers } from 'graphql-tools';

type User = {
  email: string;
  id: string;
};

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void): string {
      return `👋 Hello world! 👋`;
    },
    me: async (_: void, args: void): Promise<any> => {
      return {
        email: 'hole',
        id: 'id'
      }
    },
    shop: async (_: void, args: void): Promise<any> => {
      return {
        description: 'Compra hoy, disfruta mañana',
        name: 'Bacán'
      }
    }
  },
  Address: {
    firstName: (_:void, args: void) => {
      return 'Hello';
    }
  },
  Shop: {
    navigation: (_:void, args: void) => {
      return {
        main: [{
          id: '1',
          name: 'Restaurantes'
        }, {
          id: '2',
          name: 'Ferreterías'
        }],
        secondary: [{
          id: '1',
          name: 'Restaurantes'
        }, {
          id: '2',
          name: 'Ferreterías'
        }]
      }
    }, 
    companyAddress: (_:void, args: void) => {
      return {
        firstName: 'Helolo'
      }
    }
  },
  Checkout: {
    availablePaymentGateways: (_:void, args: void) => {
      return 'here';
    }
  },
  Navigation: {
    main: (source: any, args: any) => {
      // TODO add it to Contentful
      return [{
        id: '1',
        name: 'Restaurantes'
      }, {
        id: '2',
        name: 'Ferreterías'
      }];
    },
    secondary: (source: any, args: any) => {
      return [{
        id: '1',
        name: 'Restaurantes'
      }, {
        id: '2',
        name: 'Ferreterías'
      }];
    }
  },
  // Menu: {
  //   id: () => {
  //     return 'asdasd';
  //   },
  //   name: (parent: any, args: any, context: any) => {
  //     console.log(parent);
  //     console.log(args);
  //     console.log(context);
  //     return parent
  //   }
  // }
};
export default resolverMap;