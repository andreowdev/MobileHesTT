import { Text, View } from "react-native";
import Table from "./Table";
import * as Animatable from "react-native-animatable";
import { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is imported

export default function Financeiro() {
  const [vendas, setVendas] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch data
  const vendasI = async () => {
    try {
      const response = await axios.get("http://192.168.1.9:3000/financeiro");
      setVendas(response.data); 
    } catch (error) {
      setError("Erro ao fazer requisição!");
    }
  };


  useEffect(() => {
    vendasI(); 
  }, []);

  const totalVendas = vendas.reduce((acc, venda) => acc + parseFloat(venda.valorMovimento), 0).toFixed(2);

  return (
    <Animatable.View animation={"fadeInUp"} delay={1000}>
      <Text>Financeiro</Text>
      <Table vendasData={vendas} /> 
      <View>
        <Text>TOTAL DE VENDA: R$ {totalVendas}</Text> 
      </View>
    </Animatable.View>
  );
}
