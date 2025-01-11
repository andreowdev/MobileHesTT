import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {

      const navigation = useNavigation()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      axios.get('http://192.168.1.9:3000/users')
          .then(response => {
  
              const user = response.data.find(u => u.nomeUsuario === username && u.nomeSenha === password);
  
              if (user) {
                  // Login bem-sucedido
                  Alert.alert("Sucesso", "Login realizado com sucesso!");
                  navigation.navigate("Home");
              } else {
                  Alert.alert("Erro", "Nome de usuário ou senha incorretos.");
              }
          })
          .catch(error => {
              console.error('Erro ao buscar usuários:', error);
              Alert.alert("Erro", "Erro ao tentar se conectar ao servidor.");
          });
  };
  

    return (
        <View style={styles.container}>
            <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem Vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation={"fadeInUp"} style={styles.containerForm}>
                <Text style={styles.title}>Usuário</Text>
                <TextInput
                    placeholder="Digite seu nome de usuário"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Sua senha"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#38a69d",
    },
    containerHeader: {
        marginTop: "14%",
        marginBottom: "8%",
        paddingStart: "5%"
    },
    message: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFF"
    },
    containerForm: {
        backgroundColor: "#FFF",
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%"
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#38a69d",
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: "center"
    },
    registerText: {
        color: "#a1a1a1"
    }
});
