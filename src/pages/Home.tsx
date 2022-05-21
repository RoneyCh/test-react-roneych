import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <Flex
      bgGradient="linear(to-l, #0f1320, #000102)"
      justify="center"
      align="center"
      w="100vw"
      h="100vh"
    >
      {user ? (
        <Text mb="10rem" color="rgb(61, 91, 110)" fontSize={["3rem", "4rem", "6rem"]}>
          Olá, {user?.name}
        </Text>
      ) : (
        <Flex direction='column' alignItems='center' justifyContent='center'>
          <Text fontSize={['1.5rem','3rem']} alignSelf='center' color="rgb(61, 91, 110)">Por favor, clique no botão abaixo e realize o login</Text>
          <Button mt='1rem' alignSelf='center' w='4rem' colorScheme="blue" onClick={() => navigate("/")}>
            Sair
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
