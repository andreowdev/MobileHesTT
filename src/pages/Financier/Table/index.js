import { useState } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { useVendas } from '../hooks/useVendas';
import { Feather } from '@expo/vector-icons';

export default function Table() {
  const { vendasData, loading, error, vendasI } = useVendas();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
   
  const viewProducts = (idFinanceiroGrupoPedido) => {
    setSelectedId(idFinanceiroGrupoPedido);  
    setModalVisible(true);  
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>N°{item.idFinanceiroGrupoPedido}</Text>
      <Text style={styles.cell}>N°{item.idGrupoPedido}</Text>
      <Text style={styles.cell}>R${item.valorPedido},00</Text>
      <Text style={styles.cell}>R${item.valorMovimento},00</Text>
      <Text style={styles.cell}>
        {new Date(item.dataMovimento).toLocaleDateString("pt-BR")}
      </Text>
      <TouchableOpacity onPress={() => viewProducts(item.idGrupoPedido)}>
        <Feather name="more-vertical" size={24} color={"black"} style={styles.threeDots} />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>CÓDIGO</Text>
        <Text style={styles.headerCell}>PEDIDO</Text>
        <Text style={styles.headerCell}>VALOR TOTAL</Text>
        <Text style={styles.headerCell}>VALOR PAGO</Text>
        <Text style={styles.headerCell}>D/ENTRADA</Text>
      </View>
      <FlatList
        data={vendasData}
        renderItem={renderItem}
        keyExtractor={(item) => item.idGrupoPedido.toString()}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={vendasI} />}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Produtos do Pedido {selectedId}</Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 22,
    overflow: "hidden",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#38a69d",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginTop: 30,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    flex: 1,
  },
  cell: {
    fontSize: 12,
    textAlign: "center",
    flex: 1,
  },
  threeDots: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38a69d",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
