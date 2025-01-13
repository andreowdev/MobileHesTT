import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import axios from 'axios';

export default function Table() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true); 

    // Função para buscar os produtos
    const fetchProdutos = () => {
        setLoading(true);
        axios.get('http://192.168.1.9:3000/produtos')
            .then(response => {
                setProdutos(response.data); 
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar os produtos:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const onRefresh = () => {
        fetchProdutos();
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>
                {item.status === 1 ? "EM ESTOQUE" : "SEM ESTOQUE"}
            </Text>
            <Text style={styles.cell}>{item.nomeProduto}</Text>
            <Text style={styles.cell}>{item.preco}</Text>
            <Text style={styles.cell}>{item.quantidade} unidades</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerCell}>ESTOQUE</Text>
                <Text style={styles.headerCell}>PRODUTO</Text>
                <Text style={styles.headerCell}>PREÇO</Text>
                <Text style={styles.headerCell}>QUANTIDADE</Text>
            </View>

            <FlatList
                data={produtos}
                renderItem={renderItem}
                keyExtractor={(item) => item.idProduto.toString()}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#38a69d', // Cor do cabeçalho
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
    },
    headerCell: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14, // Aumentei o tamanho da fonte
        textAlign: 'center',
        flex: 1,
    },
    cell: {
        fontSize: 14,
        textAlign: 'center',
        flex: 1,
    },
});
