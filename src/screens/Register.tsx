import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import firestore from "@react-native-firebase/firestore";

export function Register() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos.");
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony: patrimony,
        description: description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possível registrar a solicitação."
        );
      });
  }

  return (
    <VStack flex={1} padding={6} bg="gray.600">
      <Header title="Nova Solicitação" />

      <Input
        placeholder="Número do Patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />
      <Button
        onPress={handleNewOrderRegister}
        isLoading={isLoading}
        title="Cadastrar"
        mt={5}
      />
    </VStack>
  );
}
