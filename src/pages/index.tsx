import { Flex, Spinner, Text } from '@chakra-ui/react'
import { DefaultButton } from '../components/DefaultButton'
import { Logo } from '../components/Logo'
import { useAuthContext } from '../components/context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export default function Home(){

  const {user, login} = useAuthContext()
  const session = supabase.auth.session()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleLogin(){
    setLoading(true)
    login()
  }

  useEffect(() => {
      user?.email && router.push("/todos")
  }, [session?.user, user])

  return (
    
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Logo />

      <DefaultButton
      onClick={handleLogin}
      >
          {
            session?.user || loading ?
            <Spinner color="black"/>
            :
            <Text>Sign In With Google</Text>
          }
      </DefaultButton>
    </Flex>
  )
}
