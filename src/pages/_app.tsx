import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../components/context/AuthContext'
import { TodoContextProvider } from '../components/context/TodoContext'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider resetCSS>
      <AuthContextProvider>
        <TodoContextProvider>
          <Component {...pageProps} />
        </TodoContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
