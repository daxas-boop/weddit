import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { LoginMutation, MeQuery, MeDocument, RegisterMutation } from '../generated/graphql';
import { updateQuery } from './updateQuery';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, _args, cache, _info) => {
            updateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
              if (result.login.errors) {
                return query;
              } else {
                return {
                  me: result.login.user,
                };
              }
            });
          },

          register: (_result, _args, cache, _info) => {
            updateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
              if (result.register.errors) {
                return query;
              } else {
                return {
                  me: result.register.user,
                };
              }
            });
          },

          logout: (_result, _args, cache, _info) => {
            updateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({
              me: null,
            }));
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
