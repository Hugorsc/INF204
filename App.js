import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

// Array estático fora do componente
const contatosIniciais = [
  { id: "1", nome: "Alice Silva", telefone: "(31) 99999-1111" },
  { id: "2", nome: "Bruno Costa", telefone: "(31) 98888-2222" },
  { id: "3", nome: "Carlos Souza", telefone: "(31) 97777-3333" },
  { id: "4", nome: "Diana Rocha", telefone: "(31) 96666-4444" },
  { id: "5", nome: "Eduardo Lima", telefone: "(31) 95555-5555" },
  { id: "6", nome: "Fernanda Alves", telefone: "(31) 94444-6666" },
  { id: "7", nome: "Gabriel Mendes", telefone: "(31) 93333-7777" },
  { id: "8", nome: "Helena Martins", telefone: "(31) 92222-8888" },
  { id: "9", nome: "Igor Oliveira", telefone: "(31) 91111-9999" },
  { id: "10", nome: "Juliana Santos", telefone: "(31) 90000-1234" },
  { id: "11", nome: "Lucas Pereira", telefone: "(31) 98888-5678" },
  { id: "12", nome: "Mariana Souza", telefone: "(31) 97777-1234" },
  { id: "13", nome: "Nicolas Ferreira", telefone: "(31) 96666-5678" },
  { id: "14", nome: "Olivia Rodrigues", telefone: "(31) 95555-7890" },
  { id: "15", nome: "Pedro Martins", telefone: "(31) 94444-1234" },
];

export default function Agenda() {
  const [contatos, setContatos] = useState(contatosIniciais);
  const [carregando, setCarregando] = useState(false);

  // Desenha cada contato
  const renderizarContato = ({ item }) => (
    <View style={styles.cardContato}>
      <Text style={styles.nomeText}>{item.nome}</Text>
      <Text style={styles.telefoneText}>{item.telefone}</Text>
    </View>
  );

  // Cria o separador entre os contatos
  const renderizarSeparador = () => <View style={styles.separador} />;

  // Aparece quando a lista está vazia
  const renderizarVazio = () => (
    <View style={styles.containerVazio}>
      <Text style={styles.textoVazio}>Agenda Vazia.</Text>
    </View>
  );

  // Limpa todos os contatos
  const limparAgenda = () => {
    setContatos([]);
  };

  // Pull-to-Refresh
  const recarregarAgenda = () => {
    setCarregando(true);

    setTimeout(() => {
      setContatos(contatosIniciais);
      setCarregando(false);
    }, 2000);
  };

  // Rolagem infinita
  const carregarMaisContatos = () => {
    const novosContatos = [
      {
        id: String(Date.now()),
        nome: "Rafael Almeida",
        telefone: "(31) 93333-1111",
      },
      {
        id: String(Date.now() + 1),
        nome: "Sofia Carvalho",
        telefone: "(31) 92222-2222",
      },
      {
        id: String(Date.now() + 2),
        nome: "Thiago Barbosa",
        telefone: "(31) 91111-3333",
      },
    ];

    setContatos((contatosAtuais) => [
      ...contatosAtuais,
      ...novosContatos,
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Minha Agenda</Text>

        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={limparAgenda}
        >
          <Text style={styles.textoBotao}>Limpar Tudo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarContato}
        ItemSeparatorComponent={renderizarSeparador}
        ListEmptyComponent={renderizarVazio}
        onEndReached={carregarMaisContatos}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={carregando}
            onRefresh={recarregarAgenda}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
  },

  botaoLimpar: {
    backgroundColor: "#D32F2F",
    padding: 10,
    borderRadius: 8,
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },

  cardContato: {
    padding: 20,
    backgroundColor: "#FFF",
  },

  nomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  telefoneText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },

  separador: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },

  containerVazio: {
    alignItems: "center",
    marginTop: 50,
  },

  textoVazio: {
    fontSize: 18,
    color: "#808080",
    fontStyle: "italic",
  },
});