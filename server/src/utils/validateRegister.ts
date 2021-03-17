import { UsernamePasswordInput } from 'src/resolvers/UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 3) {
    return [
      {
        field: 'username',
        message: 'length must be greater than 3',
      },
    ];
  }

  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'invalid email',
      },
    ];
  }

  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'cannot include @',
      },
    ];
  }

  if (options.password.length < 6) {
    return [
      {
        field: 'password',
        message: 'length must have at least 6 characters',
      },
    ];
  }

  return null;
};
