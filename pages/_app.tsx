import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query';
import { useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client] =  useState(new QueryClient);
  return <QueryClientProvider client={client}>
    <Component {...pageProps} />
  </QueryClientProvider> 
}
