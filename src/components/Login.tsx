import { Input } from "../components/Input";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthContext } from "../context/AuthContext";
import { Button, Flex, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { RiEyeLine } from "react-icons/ri";

type SignInData = {
  name: string;
  password: string;
}

const formValidation = yup.object().shape({
  name: yup.string().required('Campo obrigatório').min(4, 'O nome precisa ter pelo menos 4 caracteres'),
  password: yup.string().required('Campo obrigatório'),
})

export default function Login() {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  const { login, erro, setErro } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm<SignInData>({
    resolver: yupResolver(formValidation)
  });
  const {errors} = formState;


  const handleSubmitLogin:SubmitHandler<SignInData> = async (values)=> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    await login(values)
  };

  useState(() => {
    setTimeout(() => {
      setErro(false);
    }, 1000)
  })

  return (
    <Flex align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        p={['6','8']}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSubmitLogin)}
      >
        <Stack spacing='4'>
        <Input 
          type="text"
          placeholder='Usuário'
          error={errors.name}
          {...register('name')}
          />
          <InputGroup>
        <Input 
          type={show ? 'text' : 'password'}
          placeholder='Senha'
          error={errors.password}
          {...register('password')}
          />
        <InputRightElement width="4.5rem">
              <Button
                cursor="pointer"
                colorScheme="none"
                fontSize="1rem"
                ml="1rem"
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? <RiEyeLine /> : <RiEyeLine />}
              </Button>
            </InputRightElement>
            </InputGroup>
        {erro && <Text color='red'>Dados incorretos ou usuário não existe</Text>}

        </Stack>
        <Button colorScheme='blue' mt='5' color="white" type="submit" isLoading={formState.isSubmitting}>
          Login
        </Button>
   
      </Flex>
    </Flex>
  );
}