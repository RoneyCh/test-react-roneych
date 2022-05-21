import { Button, Flex, Image } from "@chakra-ui/react";
import { useState } from "react";
import Cadaster from "../components/Cadaster";
import Login from "../components/Login";

export default function SignIn() {
  // condições para mostrar as telas cadastro/login
  const [stateCadaster, setStateCadaster] = useState<boolean>(false);
  const [stateLogin, setStateLogin] = useState<boolean>(true);

  // mostrar link ativo
  const isCadasterActive = () => {
    if(stateCadaster === true) {
      return '#3D82CD'
    } 
  }

  const isLoginActive = () => {
    if(stateLogin === true) {
      return '#3D82CD'
    }
  }

  return (
    <Flex
      w="100vw"
      maxW={['460','768' ,'1480']}
      h="100vh"
      bgGradient="linear(to-l, #0f1320, #000102)"
      color="white"
      align={["center", 'center', "center"]}
      direction={['column','column', 'column', 'row']}
    >
      <Flex ml={[0, 0, 0, "15rem"]} mt={['8rem', '8rem','8rem', 0]} direction="column" align="flex-start ">
        <Flex justifyContent="center">
          <Button fontSize={['0.8rem', '1rem']} bg="none" color={isLoginActive()} _active={{
            bgColor:'none'
          }} _hover={{
            bgColor:'none'
          }} onClick={() => {setStateLogin(true); setStateCadaster(false)}}>
            Login
          </Button>
          <Button fontSize={['0.8rem', '1rem']} bg="none" _active={{
            bgColor:'none'
          }} color={isCadasterActive()} _hover={{
            bgColor:'none'
          }} onClick={() => {setStateCadaster(true); setStateLogin(false)}}>
            Cadastrar-se
          </Button>
        </Flex>
        {stateCadaster && (
          <Flex>
            <Cadaster />
          </Flex>
        )}
        {stateLogin && (
          <Flex>
            <Login />
          </Flex>
        )}
      </Flex>
      <Flex ml={[0, 0, 0,'12rem' ]} mt={['2rem', '2rem','2rem', 0]}>
        <Image w='12rem' src='https://oneblue.io/wp-content/uploads/2022/03/oneblue-200-01-150x150.png'/>
      </Flex>
    </Flex>
  );
}
