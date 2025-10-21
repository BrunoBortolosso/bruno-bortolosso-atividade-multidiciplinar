/**
 * app.js - Aplicação principal com classes de POO
 * Classes: Restaurante, Prato, Artista, Musica
 */

// ========== CLASSE PRATO ==========
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
// RESPOSTA: A classe Prato é um "molde" para criar objetos que representam pratos de um restaurante.
// O 'constructor' é um método especial que é executado automaticamente quando criamos um novo objeto
// usando 'new Prato()'. Ele inicializa as propriedades do objeto com os valores passados como parâmetros.
// Por exemplo: new Prato('Pizza', 25.00, ['queijo', 'tomate']) cria um objeto prato com essas informações.

// Copilot, o que é 'this' neste contexto?
// RESPOSTA: 'this' se refere ao próprio objeto que está sendo criado ou manipulado.
// Quando escrevemos 'this.nome = nome', estamos dizendo "o objeto atual terá uma propriedade 'nome'
// com o valor que foi passado no parâmetro 'nome'". É como dizer "meu nome" ou "meu preço" para
// cada instância individual de Prato. Cada objeto tem seu próprio 'this' com seus próprios valores.

// ========== CLASSE RESTAURANTE ==========
class Restaurante {
  constructor(nome, endereco) {
    this.nome = nome;
    this.endereco = endereco;
    this.menu = [];
  }

  adicionarPrato(prato) {
    if (prato instanceof Prato) {
      this.menu.push(prato);
      console.log(`✅ Prato "${prato.nome}" adicionado ao menu!`);
    } else {
      throw new TypeError('adicionarPrato espera uma instância de Prato');
    }
  }

  removerPrato(nomePrato) {
    const tamanhoAnterior = this.menu.length;
    this.menu = this.menu.filter(p => p.nome !== nomePrato);
    
    if (this.menu.length < tamanhoAnterior) {
      console.log(`🗑️ Prato "${nomePrato}" removido do menu!`);
    } else {
      console.log(`⚠️ Prato "${nomePrato}" não encontrado.`);
    }
  }

  listarPratos() {
    if (this.menu.length === 0) {
      return 'Menu vazio';
    }
    return this.menu.map(p => p.descrever()).join('\n');
  }

  render() {
    // Exemplo simples de "render": gerar string de apresentação do restaurante
    return `
╔════════════════════════════════════════╗
║  🍽️  ${this.nome.toUpperCase()}
║  📍 ${this.endereco}
╠════════════════════════════════════════╣
║  MENU:
║  ${this.listarPratos().replace(/\n/g, '\n║  ')}
╚════════════════════════════════════════╝
    `.trim();
  }
}

// Copilot, me explique esta classe. O que é um 'constructor'?
// RESPOSTA: A classe Restaurante é um modelo para criar objetos que representam restaurantes.
// O 'constructor' inicializa cada restaurante com um nome, endereço e um array vazio de pratos (menu).
// Isso garante que todo restaurante criado comece com uma estrutura consistente e dados iniciais corretos.

// Copilot, por que este método 'render' é útil?
// RESPOSTA: O método 'render' é útil porque centraliza a lógica de apresentação do restaurante.
// Em vez de escrever código de formatação toda vez que precisamos exibir os dados, chamamos render()
// e ele retorna uma string formatada e visualmente agradável. Isso facilita manutenção: se quisermos
// mudar o formato de exibição, alteramos apenas este método, não todo o código que usa a classe.
// É o princípio de "separação de responsabilidades" - a classe sabe como se apresentar.

// Copilot, o que é 'this' neste contexto?
// RESPOSTA: Dentro da classe Restaurante, 'this' refere-se à instância específica do restaurante.
// Quando temos 'this.nome', 'this.endereco' e 'this.menu', estamos acessando as propriedades
// daquele restaurante específico. Se criarmos dois restaurantes diferentes, cada um terá seu próprio
// 'this' com valores únicos. É como cada restaurante ter sua própria identidade e cardápio.

// ========== CLASSE MUSICA ==========
class Musica {
  constructor(titulo, duracao, genero) {
    this.titulo = titulo;
    this.duracao = duracao; // em segundos
    this.genero = genero;
  }

  tocar() {
    return `🎵 Tocando: "${this.titulo}" (${this.formatarDuracao()}) - Gênero: ${this.genero}`;
  }

  formatarDuracao() {
    const minutos = Math.floor(this.duracao / 60);
    const segundos = this.duracao % 60;
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  }
}

// Copilot, me explique esta classe. O que é um 'constructor'?
// RESPOSTA: A classe Musica representa uma música com título, duração (em segundos) e gênero.
// O 'constructor' é chamado quando criamos uma nova música (ex: new Musica('Garota de Ipanema', 315, 'Bossa Nova')).
// Ele recebe os parâmetros e os armazena nas propriedades do objeto, criando uma nova instância de música.

// Copilot, o que é 'this' neste contexto?
// RESPOSTA: 'this' se refere à música específica sendo manipulada. Quando usamos 'this.titulo',
// estamos acessando o título DESTA música, não de outras. O método formatarDuracao() usa 'this.duracao'
// para pegar a duração da música atual e convertê-la de segundos para o formato MM:SS.
// Cada música criada tem seu próprio 'this' com seus próprios dados únicos.

// ========== CLASSE ARTISTA ==========
class Artista {
  constructor(nome, genero) {
    this.nome = nome;
    this.genero = genero;
    this.discografia = [];
  }

  adicionarMusica(musica) {
    if (musica instanceof Musica) {
      this.discografia.push(musica);
      console.log(`✅ Música "${musica.titulo}" adicionada à discografia de ${this.nome}!`);
    } else {
      throw new TypeError('adicionarMusica espera uma instância de Musica');
    }
  }

  removerMusica(tituloMusica) {
    const tamanhoAnterior = this.discografia.length;
    this.discografia = this.discografia.filter(m => m.titulo !== tituloMusica);
    
    if (this.discografia.length < tamanhoAnterior) {
      console.log(`🗑️ Música "${tituloMusica}" removida!`);
    } else {
      console.log(`⚠️ Música "${tituloMusica}" não encontrada.`);
    }
  }

  listarMusicas() {
    if (this.discografia.length === 0) {
      return 'Nenhuma música na discografia';
    }
    return this.discografia.map((m, idx) => 
      `${idx + 1}. ${m.titulo} - ${m.genero} (${m.formatarDuracao()})`
    ).join('\n');
  }

  render() {
    return `
╔════════════════════════════════════════╗
║  🎤 ARTISTA: ${this.nome}
║  🎸 Gênero: ${this.genero}
╠════════════════════════════════════════╣
║  DISCOGRAFIA:
║  ${this.listarMusicas().replace(/\n/g, '\n║  ')}
╚════════════════════════════════════════╝
    `.trim();
  }
}

// Copilot, me explique esta classe. O que é um 'constructor'?
// RESPOSTA: A classe Artista modela um artista musical com nome, gênero e uma coleção de músicas (discografia).
// O 'constructor' inicializa o artista com nome e gênero, e cria um array vazio para a discografia.
// Quando fazemos 'new Artista('Tom Jobim', 'Bossa Nova')', o constructor prepara o objeto com esses dados.

// Copilot, por que este método 'render' é útil?
// RESPOSTA: O método render() é útil porque encapsula toda a lógica de apresentação visual do artista.
// Em vez de ter código de formatação espalhado pelo programa, centralizamos aqui. Se precisarmos mudar
// como exibimos um artista (adicionar mais informações, mudar o estilo visual, etc), modificamos apenas
// este método. Isso torna o código mais organizado, reutilizável e fácil de manter. É um exemplo de
// "encapsulamento" - a classe sabe como se apresentar ao mundo externo.

// Copilot, o que é 'this' neste contexto?
// RESPOSTA: 'this' refere-se à instância específica do artista. Quando usamos 'this.nome', 'this.genero'
// e 'this.discografia', estamos acessando os dados DESTE artista específico. Se tivermos Tom Jobim e
// João Gilberto como dois objetos Artista diferentes, cada um terá seu próprio 'this' com nome, gênero
// e discografia únicos. É o que permite que múltiplos objetos da mesma classe coexistam com dados diferentes.

// ========== EXEMPLOS DE USO ==========
console.log('═'.repeat(50));
console.log('🍽️  EXEMPLO: RESTAURANTE');
console.log('═'.repeat(50));

const restaurante = new Restaurante('Sabor Brasileiro', 'Rua das Flores, 123');

const feijoada = new Prato('Feijoada', 35.00, ['feijão preto', 'carne de porco', 'linguiça', 'arroz']);
const moqueca = new Prato('Moqueca de Peixe', 42.50, ['peixe', 'leite de coco', 'tomate', 'pimentão']);
const pudim = new Prato('Pudim de Leite', 12.00, ['leite condensado', 'ovos', 'açúcar']);

restaurante.adicionarPrato(feijoada);
restaurante.adicionarPrato(moqueca);
restaurante.adicionarPrato(pudim);

console.log('\n' + restaurante.render());

console.log('\n' + '═'.repeat(50));
console.log('🎤  EXEMPLO: ARTISTA E MÚSICAS');
console.log('═'.repeat(50));

const artista = new Artista('Tom Jobim', 'Bossa Nova');

const garota = new Musica('Garota de Ipanema', 315, 'Bossa Nova');
const aguas = new Musica('Águas de Março', 200, 'MPB');
const desafinado = new Musica('Desafinado', 180, 'Bossa Nova');

artista.adicionarMusica(garota);
artista.adicionarMusica(aguas);
artista.adicionarMusica(desafinado);

console.log('\n' + artista.render());

console.log('\n' + '═'.repeat(50));
console.log('🎵  TOCANDO MÚSICAS');
console.log('═'.repeat(50));

artista.discografia.forEach(musica => {
  console.log(musica.tocar());
});

console.log('\n' + '═'.repeat(50));
console.log('✅  Aplicação finalizada!');
console.log('═'.repeat(50));
