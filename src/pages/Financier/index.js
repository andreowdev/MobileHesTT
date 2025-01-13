import { Text, View } from "react-native";
import Table from "./Table";
import * as Animatable from "react-native-animatable"



export default function Financeiro() {

  return(
    <Animatable.View animation={"fadeInUp"} delay={1000}>
      <Text>Financeiro</Text>
      <Table />
    </Animatable.View>
  )
}