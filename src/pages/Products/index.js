import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { usePedidos } from "./hooks/useProdutos";

export default function Products() {
  const { pedidosData, loading, error } = usePedidos();

  // Exibe mensagem de carregamento enquanto os dados não são carregados
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  // Exibe mensagem de erro caso a requisição tenha falhado
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  // Exibe os dados dos pedidos quando a requisição for bem-sucedida
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      {pedidosData && pedidosData.length > 0 ? (
        <FlatList
          data={pedidosData}
          keyExtractor={(item) => item.idProduto.toString()}
          renderItem={({ item }) => (
            <Text style={styles.itemText}>{item.nomeProduto}</Text> // Use 'nomeProduto' instead of 'nome'
          )}
        />
      ) : (
        <Text style={styles.text}>Não há pedidos disponíveis.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
