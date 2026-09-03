
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [jogador, setJogador] = useState("X");

  const verificarVencedor = (tabuleiroAtual) => {
    const combinacoes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combinacao of combinacoes) {
      const [a, b, c] = combinacao;

      if (
        tabuleiroAtual[a] &&
        tabuleiroAtual[a] === tabuleiroAtual[b] &&
        tabuleiroAtual[a] === tabuleiroAtual[c]
      ) {
        return tabuleiroAtual[a];
      }
    }

    if (!tabuleiroAtual.includes("")) {
      return "Empate";
    }

    return null;
  };

  const jogar = (indice) => {
    if (tabuleiro[indice] !== "") {
      return;
    }

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = jogador;

    setTabuleiro(novoTabuleiro);

    const vencedor = verificarVencedor(novoTabuleiro);

    if (vencedor) {
      Alert.alert(
        vencedor === "Empate"
          ? "Empate!"
          : `Jogador ${vencedor} venceu!`,
        "O jogo será reiniciado.",
        [
          {
            text: "OK",
            onPress: reiniciarJogo,
          },
        ]
      );

      return;
    }

    setJogador(jogador === "X" ? "O" : "X");
  };

  const reiniciarJogo = () => {
    setTabuleiro([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setJogador("X");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.informacao}>
        Vez do jogador: {jogador}
      </Text>

      <View style={styles.tabuleiro}>
        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(0)}
          >
            <Text style={styles.textoCelula}>{tabuleiro[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(1)}
          >
            <Text style={styles.textoCelula}>{tabuleiro[1]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(2)}
          >
            <Text style={styles.textoCelula}>{tabuleiro[2]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(3)}
          >
            <Text style={styles.textoCelula}>{tabuleiro[3]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(4)}
          >
            <Text style={styles.textoCelula}>{tabuleiro[4]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(5)}
          >
            <Text style={styles.textoCelula}>{tabuleiro[5]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(6)}
          >
            <Text style={styles.textoCelula}>{tabuleiro[6]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(7)}
          >
            <Text style={styles.textoCelula}>{tabuleiro[7]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(8)}
          >
            <Text style={styles.textoCelula}>{tabuleiro[8]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.botaoReiniciar}
        onPress={reiniciarJogo}
      >
        <Text style={styles.textoBotao}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  informacao: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#14325A",
  },

  tabuleiro: {
    width: 270,
    height: 270,
  },

  linha: {
    flexDirection: "row",
    flex: 1,
  },

  celula: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#14325A",
    justifyContent: "center",
    alignItems: "center",
  },

  textoCelula: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#0064A0",
  },

  botaoReiniciar: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
