/**
 * classes.js - exemplos de classes de POO: Restaurante, Prato, Artista, Musica
 * Inclui comentários com perguntas para o Copilot explicando construtor, render e this.
 */

class Prato {
  constructor(nome, preco, ingredientes = []) {
    this.nome = nome;
    this.preco = preco;
    this.ingredientes = ingredientes;
  }

  descrever() {
    return `${this.nome} - R$${this.preco.toFixed(2)} (Ingredientes: ${this.ingredientes.join(', ')})`;
  }
}

// Copilot, me explique esta classe. O que é um 'constructor'?
// Copilot, o que é 'this' neste contexto?

class Restaurante {
  constructor(nome, endereco) {
    this.nome = nome;
    this.endereco = endereco;
    this.menu = [];
  }

  adicionarPrato(prato) {
    if (prato instanceof Prato) this.menu.push(prato);
    else throw new TypeError('adicionarPrato espera um Prato');
  }

  removerPrato(nomePrato) {
    this.menu = this.menu.filter(p => p.nome !== nomePrato);
  }

  listarPratos() {
    return this.menu.map(p => p.descrever()).join('\n');
  }

  render() {
    // Exemplo simples de "render": gerar string de apresentação do restaurante
    return `Restaurante ${this.nome} - ${this.endereco}\nMenu:\n${this.listarPratos()}`;
  }
}

// Copilot, me explique esta classe. O que é um 'constructor'?
// Copilot, por que este método 'render' é útil?
// Copilot, o que é 'this' neste contexto?

class Musica {
  constructor(titulo, duracao, genero) {
    this.titulo = titulo;
    this.duracao = duracao; // em segundos
    this.genero = genero;
  }

  tocar() {
    return `Tocando: ${this.titulo} (${this.duracao}s)`;
  }
}

// Copilot, me explique esta classe. O que é um 'constructor'?
// Copilot, o que é 'this' neste contexto?

class Artista {
  constructor(nome, genero) {
    this.nome = nome;
    this.genero = genero;
    this.discografia = [];
  }

  adicionarMusica(musica) {
    if (musica instanceof Musica) this.discografia.push(musica);
    else throw new TypeError('adicionarMusica espera uma Musica');
  }

  listarMusicas() {
    return this.discografia.map(m => `${m.titulo} - ${m.genero} (${m.duracao}s)`).join('\n');
  }

  render() {
    return `Artista: ${this.nome} (${this.genero})\nMúsicas:\n${this.listarMusicas()}`;
  }
}

// Copilot, me explique esta classe. O que é um 'constructor'?
// Copilot, por que este método 'render' é útil?
// Copilot, o que é 'this' neste contexto?

module.exports = { Prato, Restaurante, Musica, Artista };
