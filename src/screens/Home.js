
import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function DetalhesUsuario({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela Inicial</Text>

<TouchableOpacity
  style={styles.botao}
  onPress={() => navigation.goBack()}
>
  <Text style={styles.textoBotao}>Voltar</Text>
</TouchableOpacity>

      <Button
        title="Ver Perfil do Usuario"
        onPress={() =>
          navigation.navigate("Detalhes", {
            nomeUsuario: "Turma INF204"
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  botao: {
  backgroundColor: "#2196F3",
  padding: 12,
  borderRadius: 8,
  marginTop: 20
},
textoBotao: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "bold"
}
});
