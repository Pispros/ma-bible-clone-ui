'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, Grid, Box, useMediaQuery } from '@chakra-ui/react';
import { StoreProvider } from 'easy-peasy';
import { easyPeasyStore } from '@/stores';


export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {

  const [isForDesktop] = useMediaQuery('(min-width: 990px)');

  return (
    <StoreProvider store={easyPeasyStore}>
        <CacheProvider>
            <ChakraProvider>
            {children}              
            </ChakraProvider>
        </CacheProvider>
    </StoreProvider>
    
  )
}