import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Table() {
  const [vendasData, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const vendasI = async () => {
    try {
      const response = await axios.get("http://192.168.1.9:3000/financeiro");
      setVendas(response.data);
      setLoading(false);
    } catch (error) {
      setError("Erro ao fazer a requisição");
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.nomeGrupoPedido}</Text>
        <Text style={styles.cell}>{item.valorPedido}</Text>
        <Text style={styles.cell}>{item.valorMovimento}</Text>
        <Text style={styles.cell}>
          {new Date(item.dataMovimento).toLocaleDateString("pt-BR")}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    vendasI();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>; // Exibe enquanto carrega os dados
  }

  if (error) {
    return <Text>{error}</Text>; // Exibe se houve erro na requisição
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>PEDIDO</Text>
        <Text style={styles.headerCell}>VALOR TOTAL</Text>
        <Text style={styles.headerCell}>VALOR PAGO</Text>
        <Text style={styles.headerCell}>D/ENTRADA</Text>
      </View>
      <FlatList
        data={vendasData}
        renderItem={renderItem}
        keyExtractor={(item) => item.idGrupoPedido.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={vendasI} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 22,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#38a69d", // Cor do cabeçalho
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginTop: 30,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14, // Aumentei o tamanho da fonte
    textAlign: "center",
    flex: 1,
  },
  cell: {
    fontSize: 14,
    textAlign: "center",
    flex: 1,
  },
});
