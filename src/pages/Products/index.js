import { Text, View, TouchableOpacity, StyleSheet} from "react-native";
import Table from "../Table/index";
import * as Animatable from "react-native-animatable";


export default function Products() {
      return(
            <Animatable.View style={styles.container} animation={"fadeInUp"} delay={1000}>
                  <Text style={styles.text}>TODOS OS PRODUTOS</Text>
                  <Table />
                  <View style={styles.buttonContainer}> 
                        <TouchableOpacity 
                        style={styles.button}>
                              <Text style={styles.buttonText}>Cadastrar Produto</Text>
                        </TouchableOpacity> 
                  </View>
                  <View style={styles.buttonContainer}> 
                        <TouchableOpacity 
                        style={styles.button}>
                              <Text style={styles.buttonText}>Deletar Produto</Text>
                        </TouchableOpacity> 
                  </View>
                  <View style={styles.buttonContainer}> 
                        <TouchableOpacity 
                        style={styles.button}>
                              <Text style={styles.buttonText}>Editar Produto</Text>
                        </TouchableOpacity> 
                  </View>
            </Animatable.View>
      )
}


const styles = StyleSheet.create({
      container: {
            flex: 1,
            width: '100%',
            padding: '0.2%',
      },
      text: {
            fontSize: 20,
            color: 'black',
      },
      buttonContainer: {
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '100%', 
      },
      button: {
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 7,
            marginTop: 10,
            color: 'white',
            width: '40%', 
            alignItems: 'center', 
            justifyContent: 'center', 
      },
      buttonText: {
            color: '#fff',
            fontSize: 17,
            textAlign: 'center', 
      },
})
