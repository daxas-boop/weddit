import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../utils/createUqlClient';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';

const Login = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Username Or Email" placeholder="Username or email" name="usernameOrEmail" />
            <Box mt={8}>
              <InputField type="password" label="Password" placeholder="Passowrd" name="password" />
            </Box>
            <Flex direction="column">
              <NextLink href="/forgot-password">
                <Link ml="auto" mt={1}>
                  Forgot password?
                </Link>
              </NextLink>
              <Button isLoading={isSubmitting} mt={6} type="submit">
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
