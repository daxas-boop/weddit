import React from 'react';
import { Form, Formik } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useMutation } from 'urql';

const REGISTER_MUT = `
mutation Register($username: String!, $password:String!){
  register(options: {username: $username, password:$password}){
    errors{
      field
      message
    }
    user{
      id
      username
    }
  }
}`;

interface registerProps {}

const Register = ({}: registerProps) => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          const response = await register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Username" placeholder="Username" name="username" />
            <Box mt={8}>
              <InputField type="password" label="Password" placeholder="Passowrd" name="password" />
            </Box>
            <Button isLoading={isSubmitting} mt={6} type="submit">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
