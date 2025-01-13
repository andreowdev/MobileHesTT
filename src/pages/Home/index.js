import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Table from '../Table'; 
import * as Animatable from "react-native-animatable";

export default function Home() {
    return (
        <Animatable.View style={styles.container} animation={"fadeInUp"} delay={1000}>
            <View style={styles.home}>
                <Text style={styles.welcomeMessage}>Bem-vindo ao Hest!</Text>

                <View style={styles.tableContainer}>
                    <Text style={styles.title}>Produtos Disponíveis</Text>
                    <Table />
                </View>
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "0.2%",
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
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    tableContainer: {
        marginBottom: 40,
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
