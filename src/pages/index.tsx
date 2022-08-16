import { Flex, Spinner, Text } from '@chakra-ui/react'
import { DefaultButton } from '../components/DefaultButton'
import { Logo } from '../components/Logo'
import { useAuthContext } from '../components/context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabase } from '../services/supabase'

export default function Home(){

  const {user, login} = useAuthContext()
  const session = supabase.auth.session()
  const router = useRouter()

  useEffect(() => {
    session?.user && router.push("/todos")
  }, [session?.user, user])

  return (
    
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Logo />

      <DefaultButton
      onClick={login}
      >
          {
            session?.user ?
            <Spinner color="black"/>
            :
            <Text>Sign In With Google</Text>
          }
      </DefaultButton>
    </Flex>
  )
}
