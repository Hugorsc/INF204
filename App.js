
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

// Inicialização do banco de dados e criação da tabela
const iniciarBanco = async (db) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);

  console.log("Base de Dados inicializada!");
};

// Componente principal da aplicação
export default function App() {
  return (
    <SQLiteProvider
      databaseName="app-database.db"
      onInit={iniciarBanco}
    >
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

// Tela principal
function EcraPrincipal() {
  const db = useSQLiteContext();

  const [nomeUsuario, setNomeUsuario] = useState("Visitante");
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // Carrega as preferências e tarefas ao abrir a tela
  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  // Carrega o nome salvo no AsyncStorage
  const carregarPreferencias = async () => {
    try {
      const nomeSalvo = await AsyncStorage.getItem("@AppTarefas:Nome");

      if (nomeSalvo) {
        setNomeUsuario(nomeSalvo);
      }
    } catch (erro) {
      console.error("Falha ao carregar preferências", erro);
    }
  };

  // Salva o nome do usuário no AsyncStorage
  const salvarNome = async () => {
    try {
      const novoNome = "Estudante INF204";

      await AsyncStorage.setItem("@AppTarefas:Nome", novoNome);

      setNomeUsuario(novoNome);
    } catch (erro) {
      console.error("Falha ao salvar nome", erro);
    }
  };

  // Leitura das tarefas no SQLite
  const carregarTarefas = async () => {
    try {
      const resultados = await db.getAllAsync(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      );

      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler dados", erro);
    }
  };

  // Insere uma nova tarefa no SQLite
  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") return;

    try {
      await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [novaTarefa.trim(), 0]
      );

      setNovaTarefa("");

      carregarTarefas();
    } catch (erro) {
      console.error("Erro no insert", erro);
    }
  };

  // Alterna o status de conclusão da tarefa
  const alternarStatus = async (id, statusAtual) => {
    try {
      const novoStatus = statusAtual === 1 ? 0 : 1;

      await db.runAsync(
        "UPDATE tarefas SET concluida = ? WHERE id = ?;",
        [novoStatus, id]
      );

      carregarTarefas();
    } catch (erro) {
      console.error("Erro ao atualizar tarefa", erro);
    }
  };

  // Interface da aplicação
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Olá, {nomeUsuario}!</Text>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={salvarNome}
        >
          <Text style={styles.textoBotao}>Mudar Nome</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />

        <TouchableOpacity
          style={styles.botaoAdd}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotao}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cartao}
            onPress={() => alternarStatus(item.id, item.concluida)}
          >
            <Text
              style={[
                styles.textoTarefa,
                item.concluida === 1 && styles.textoConcluido,
              ]}
            >
              {item.descricao}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
  },

  botaoAcao: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 8,
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
  },

  botaoAdd: {
    backgroundColor: "#0064A0",
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },

  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },

  textoTarefa: {
    fontSize: 18,
    color: "#333",
  },

  textoConcluido: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
