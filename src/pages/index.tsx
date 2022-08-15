import { Flex, Spinner, Text } from '@chakra-ui/react'
import { DefaultButton } from '../components/DefaultButton'
import { Logo } from '../components/Logo'
import { useAuthContext } from '../components/context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabase } from '../services/supabase'

export default function Home(){

  const {login, user} = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    console.log(user)
    user && router.push("/todos")
  })

  return (
    
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Logo />

      <DefaultButton
      onClick={login}
      >
          {
            user ?
            <Spinner color="black"/>
            :
            <Text>Sign In With Google</Text>
          }
      </DefaultButton>
    </Flex>
  )
}
