/**
 * auth.js - Sistema de Autenticação com POO
 * Classes: User (Usuário) e AuthSystem (Sistema de Autenticação)
 */

// ========== CLASSE USER (USUÁRIO) ==========
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }

  // Método para verificar se a senha está correta
  checkPassword(password) {
    return this.password === password;
  }

  // Método para obter informações do usuário (sem a senha)
  getInfo() {
    return {
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}

// Copilot, me explique esta classe. O que é um 'constructor'?
// RESPOSTA: A classe User é um molde para criar objetos que representam usuários do sistema.
// O 'constructor' é um método especial executado automaticamente quando criamos um novo usuário
// com 'new User()'. Ele inicializa as propriedades do usuário (nome, email, senha e data de criação).
// Por exemplo: new User('Bruno', 'bruno@email.com', '123456') cria um objeto usuário com essas informações.

// Copilot, o que é 'this' neste contexto?
// RESPOSTA: 'this' se refere ao próprio objeto usuário que está sendo criado ou manipulado.
// Quando escrevemos 'this.name = name', estamos dizendo "este usuário terá uma propriedade 'name'
// com o valor passado no parâmetro". É como dar identidade a cada usuário individual.

// ========== CLASSE AUTHSYSTEM (SISTEMA DE AUTENTICAÇÃO) ==========
class AuthSystem {
  constructor() {
    this.users = [];
    this.currentUser = null;
    this.loadUsers();
  }

  // Carregar usuários do localStorage
  loadUsers() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const usersData = JSON.parse(savedUsers);
      this.users = usersData.map(userData => {
        const user = new User(userData.name, userData.email, userData.password);
        user.createdAt = new Date(userData.createdAt);
        return user;
      });
    }
  }

  // Salvar usuários no localStorage
  saveUsers() {
    const usersData = this.users.map(user => ({
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt
    }));
    localStorage.setItem('users', JSON.stringify(usersData));
  }

  // Cadastrar novo usuário
  register(name, email, password) {
    // Verificar se o email já está cadastrado
    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      return {
        success: false,
        message: '❌ Este email já está cadastrado!'
      };
    }

    // Validar senha
    if (password.length < 6) {
      return {
        success: false,
        message: '❌ A senha deve ter no mínimo 6 caracteres!'
      };
    }

    // Criar novo usuário
    const newUser = new User(name, email, password);
    this.users.push(newUser);
    this.saveUsers();

    return {
      success: true,
      message: '✅ Cadastro realizado com sucesso! Faça login para continuar.',
      user: newUser.getInfo()
    };
  }

  // Fazer login
  login(email, password) {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return {
        success: false,
        message: '❌ Email não encontrado!'
      };
    }

    if (!user.checkPassword(password)) {
      return {
        success: false,
        message: '❌ Senha incorreta!'
      };
    }

    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user.getInfo()));

    return {
      success: true,
      message: `✅ Bem-vindo(a), ${user.name}!`,
      user: user.getInfo()
    };
  }

  // Fazer logout
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  // Verificar se há usuário logado
  isLoggedIn() {
    return this.currentUser !== null;
  }

  // Obter usuário atual
  getCurrentUser() {
    return this.currentUser ? this.currentUser.getInfo() : null;
  }

  // Listar todos os usuários (apenas para debug)
  listUsers() {
    return this.users.map(user => user.getInfo());
  }
}

// Copilot, me explique esta classe. O que é um 'constructor'?
// RESPOSTA: A classe AuthSystem gerencia todo o sistema de autenticação. O 'constructor'
// inicializa o sistema criando um array vazio de usuários, definindo o usuário atual como null,
// e carregando usuários salvos do localStorage. É executado automaticamente quando criamos
// uma nova instância do sistema com 'new AuthSystem()'.

// Copilot, o que é 'this' neste contexto?
// RESPOSTA: 'this' se refere à instância do sistema de autenticação. Quando usamos 'this.users',
// estamos acessando a lista de usuários DESTE sistema específico. 'this.currentUser' mantém
// referência ao usuário que está logado no momento. É como ter um gerenciador único que mantém
// controle de todos os usuários e do estado de autenticação da aplicação.

// Copilot, por que os métodos 'saveUsers' e 'loadUsers' são úteis?
// RESPOSTA: Estes métodos são essenciais para persistência de dados. 'saveUsers()' converte
// os objetos User em formato JSON e salva no localStorage do navegador, permitindo que os dados
// sobrevivam ao fechamento da página. 'loadUsers()' faz o inverso: lê os dados salvos e recria
// os objetos User. Isso simula um banco de dados básico no navegador, mantendo os usuários
// cadastrados entre sessões. É fundamental para uma aplicação de login funcional.
