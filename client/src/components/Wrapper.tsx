import { Box } from '@chakra-ui/layout';
import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
  variant?: 'small' | 'regular';
}

const Wrapper = ({ children, variant = 'regular' }: WrapperProps) => {
  return (
    <Box maxW={variant === 'regular' ? '750px' : '400px'} w="100%" mt={7} mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
