import { Input } from "./Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import {
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RiEyeLine } from "react-icons/ri";

type SignInData = {
  name: string;
  password: string;
  password_confirmation: string;
};

const formValidation = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(4, "Mínimo de 4 caracteres"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Mínimo de 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function Cadaster() {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  const { cadaster, isOk, setIsOk } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm<SignInData>({
    resolver: yupResolver(formValidation),
  });
  const { errors } = formState;

  useState(() => {
    setTimeout(() => {
      setIsOk("");
    }, 1000);
  });

  const handleSubmitCadaster: SubmitHandler<SignInData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await cadaster(values);
  };

  return (
    <Flex align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSubmitCadaster)}
      >
        <Stack spacing="4">
          <Input
            type="text"
            placeholder="Usuário"
            error={errors.name}
            {...register("name")}
          />
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Senha"
              error={errors.password}
              {...register("password")}
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
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Confirme a senha"
              error={errors.password_confirmation}
              {...register("password_confirmation")}
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
          {isOk === "success" && (
            <Text color="green">Cadastro realizado com sucesso!</Text>
          )}
          {isOk === "exist" && <Text color="red">Usuário já existe.</Text>}
        </Stack>
        <Button
          colorScheme="blue"
          mt="5"
          color="white"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Cadastrar
        </Button>
      </Flex>
    </Flex>
  );
}
