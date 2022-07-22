import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { Loading } from "../components/Loading";
import { SignIn } from "../screens/SignIn";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export function Routes() {
  const [loading, setisLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setisLoading(false);
    });

    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
