import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ItemTarefa from "./ItemTarefa";

export default function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, descricao: "Estudar ES6+", concluida: true },
    { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
    { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
    { id: 4, descricao: "Finalizar Roteiro de Pratica 02", concluida: false },
  ]);

  const tarefasPendentes = tarefas.filter((tarefa) => !tarefa.concluida);

  const adicionarTarefa = () => {
    const novaTarefa = {
      id: tarefas.length + 1,
      descricao: "Nova tarefa",
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      <Button title="Adicionar Tarefa" onPress={adicionarTarefa} />

      <View style={styles.lista}>
        {tarefas.map((tarefa) => (
          <ItemTarefa key={tarefa.id} tarefa={tarefa} />
        ))}
      </View>

      <Text style={styles.subtitulo}>Tarefas Pendentes</Text>

      {tarefasPendentes.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#20325a",
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#20325a",
  },

  lista: {
    marginTop: 20,
  },
});