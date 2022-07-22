class Forca {
  constructor(palavraSecreta) {
    // Regra 1: O jogo deve iniciar com 6 vidas
    this.vidas = 6;

    // Regra 2: O jogo deve iniciar com o estado aguardando chute.
    this.estado = Estado.Aguardando;

    // Armazena as letras chutadas
    this.letrasChutadas = [];

    // Transforma string em array: 'palavra' -> ['p', 'a', 'l', 'a', 'v', 'r', 'a']
    this.palavraSecreta = Array.from(palavraSecreta);

    // Substitui todas as letras por '_' ['p', 'a', 'l', 'a', 'v', 'r', 'a'] -> ['_', '_', '_', '_', '_', '_', '_']
    this.palavra = this.palavraSecreta.map(caracter => caracter = '_');
  }

  chutar(letra) {
    // Regra 3: Todo chute deve conter apenas uma letra, caso tenha mais de uma a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado.
    if (letra.length > 1) {
      console.log('Você pode chutar apenas uma letra por vez!');
      return;
    }

    // Regra 4: Caso a letra chutada esteja errada mas já foi chutada anteriormente a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado.
    if (this.letrasChutadas.includes(letra)) {
      console.log(`Você já chutou a letra '${letra}'!`);
      return;
    }

    // Regra 5: Toda chamada ao método chutar deve registrar a letra em letrasChutadas
    this.letrasChutadas.push(letra);

    if (this.palavraSecreta.includes(letra)) {
      // Regra 7: Se a letra chutada estiver contida na palavra, deve ser substituída na 'palavra' em sua respectiva posição.
      // Ex.: A palavra secreta é 'bala' e o jogador chutou a letra 'b', então a palavra que é retornada no método buscarDadosDoJogo, deve ser ['b', '_', '_', '_' ].
      this.palavra = this.palavraSecreta.map((caracter, index) =>
        caracter == letra ? letra : this.palavra[index]
      );

      // Regra 9: Caso a quantidade de vidas seja maior que zero e o jogador acerte a última letra, o estado do jogo deve mudar para ganhou.
      if (this.vidas >= 0 && !this.palavra.includes('_')) {
        this.estado = Estado.Ganhou;
      }
    } else {
      // Regra 6: Se a letra chutada não estiver contida na palavra, deve subtrair uma vida
      this.vidas--;

      // Regra 8: Caso a quantidade de vidas chegue a 0 (zero), o estado do jogo deve mudar para perdeu.
      if (this.vidas <= 0) {
        this.estado = Estado.Perdeu;
      }
    }
  }

  buscarEstado() {
    return this.estado;
  }

  buscarDadosDoJogo() {
    return {
      letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
      vidas: this.vidas, // Quantidade de vidas restantes
      palavra: this.palavra, // Deve ser um array com as letras que já foram acertadas ou o valor '_' para as letras não identificadas
    };
  }
}

module.exports = Forca;

// Possíveis valores: 'perdeu', 'aguardando chute' ou 'ganhou'
const Estado = {
  Perdeu: 'perdeu',
  Aguardando: 'aguardando chute',
  Ganhou: 'ganhou'
};