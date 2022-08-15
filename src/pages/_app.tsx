import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../components/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider resetCSS>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
