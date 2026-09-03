import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import JogoDaVelha from "./JogoDaVelha";

export default function App() {
  const [nome, setNome] = useState("Joao Vitor");
  const [seguindo, setSeguindo] = useState(false);

  const seguirUsuario = () => {
    setSeguindo(!seguindo);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* CARTÃO PRINCIPAL */}
      <View style={styles.cartao}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/32.jpg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>{nome}</Text>

        <Text style={styles.profissao}>Engenheiro de Software</Text>

        {/* BOTÃO CUSTOMIZADO */}
        <TouchableOpacity
          style={[
            styles.botao,
            seguindo && styles.botaoDesativado,
          ]}
          onPress={seguirUsuario}
        >
          <Text style={styles.textoBotao}>
            {seguindo ? "Já Seguindo" : "Seguir"}
          </Text>
        </TouchableOpacity>

        {/* ENTRADA DE TEXTO */}
        <TextInput
          style={styles.input}
          placeholder="Digite um novo nome"
          value={nome}
          onChangeText={(texto) => setNome(texto)}
        />
      </View>

      {/* SEGUNDO CARTÃO */}
      <View style={styles.cartao}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/44.jpg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>Maria Silva</Text>

        <Text style={styles.profissao}>Desenvolvedora Mobile</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => Alert.alert("Seguindo", "Você está seguindo Maria Silva!")}
        >
          <Text style={styles.textoBotao}>Seguir</Text>
        </TouchableOpacity>
      </View>

      {/* TERCEIRO CARTÃO */}
      <View style={styles.cartao}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/75.jpg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>Carlos Oliveira</Text>

        <Text style={styles.profissao}>Analista de Sistemas</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            Alert.alert("Seguindo", "Você está seguindo Carlos Oliveira!")
          }
        >
          <Text style={styles.textoBotao}>Seguir</Text>
        </TouchableOpacity>
      </View>

      {/* JOGO DA VELHA */}
      <View style={styles.jogoContainer}>
        <Text style={styles.tituloJogo}>Jogo da Velha</Text>
        <JogoDaVelha />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },

  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
    marginBottom: 25,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  nomeUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 5,
  },

  profissao: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },

  botaoDesativado: {
    backgroundColor: "#999999",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },

  jogoContainer: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
  },

  tituloJogo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 20,
  },
});