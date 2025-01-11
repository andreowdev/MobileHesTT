import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Table from '../Table'; 

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.home}>
                <Text style={styles.welcomeMessage}>Bem-vindo ao HEST!</Text>

                <View style={styles.tableContainer}>
                    <Text style={styles.title}>PRODUTOS DISPONÍVEIS</Text>
                    <Table />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="CADASTRO DE PRODUTOS"
                        onPress={() => Alert.alert('Cadastro de Produtos')}
                    />
                    <Button
                        title="VENDER"
                        onPress={() => Alert.alert('Vender Produto')}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
    },
    home: {
        flex: 1,
        padding: 20,
    },
    welcomeMessage: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    tableContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
});
