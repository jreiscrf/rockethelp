import { useState } from "react";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Envelope, Key } from "phosphor-react-native";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import Logo from "../assets/logo_primary.svg";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [passaword, setPassaword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !passaword) {
      return Alert.alert("Entrar", "Informe email e senha.");
    }

    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, passaword)
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail inválido.");
        }
        if (error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "E-mail ou senha inválido.");
        }
        if (error.code === "auth/wrong-passaword") {
          return Alert.alert("Entrar", "E-mail ou senha inválido.");
        }
        return Alert.alert("Entrar", "Não foi possível acessar!");
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input
        onChangeText={setEmail}
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
      />

      <Input
        onChangeText={setPassaword}
        secureTextEntry
        placeholder="Senha"
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
      />

      <Button
        isLoading={isLoading}
        onPress={handleSignIn}
        title="Entrar"
        w="full"
      />
    </VStack>
  );
}
