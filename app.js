/**
 * app.js - Aplicação de Login com POO
 * Sistema de autenticação funcional com cadastro e login
 */

// Inicializar o sistema de autenticação
const authSystem = new AuthSystem();

// ========== ELEMENTOS DO DOM ==========
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');

// Links para alternar entre login e cadastro
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// ========== FUNÇÕES AUXILIARES ==========
function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `message ${type}`;
  element.style.display = 'block';
  
  // Limpar mensagem após 5 segundos
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
}

function toggleForms() {
  loginContainer.classList.toggle('hidden');
  registerContainer.classList.toggle('hidden');
  
  // Limpar mensagens ao trocar de formulário
  loginMessage.style.display = 'none';
  registerMessage.style.display = 'none';
}

// ========== EVENT LISTENERS ==========

// Alternar para formulário de cadastro
showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  toggleForms();
  registerForm.reset();
});

// Alternar para formulário de login
showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  toggleForms();
  loginForm.reset();
});

// Processar login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  
  const result = authSystem.login(email, password);
  
  if (result.success) {
    showMessage(loginMessage, result.message, 'success');
    
    // Redirecionar para dashboard após 1.5 segundos
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  } else {
    showMessage(loginMessage, result.message, 'error');
  }
});

// Processar cadastro
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  
  // Validar confirmação de senha
  if (password !== confirmPassword) {
    showMessage(registerMessage, '❌ As senhas não coincidem!', 'error');
    return;
  }
  
  const result = authSystem.register(name, email, password);
  
  if (result.success) {
    showMessage(registerMessage, result.message, 'success');
    registerForm.reset();
    
    // Alternar para login após 2 segundos
    setTimeout(() => {
      toggleForms();
    }, 2000);
  } else {
    showMessage(registerMessage, result.message, 'error');
  }
});

// ========== INICIALIZAÇÃO ==========
console.log('🔐 Sistema de Login Inicializado!');
console.log('📊 Usuários cadastrados:', authSystem.listUsers().length);

// Copilot, me explique este código. Como funciona o sistema de autenticação?
// RESPOSTA: Este sistema de autenticação usa a classe AuthSystem para gerenciar usuários.
// Quando o usuário preenche o formulário de cadastro, criamos um novo objeto User e salvamos
// no localStorage. No login, verificamos se o email existe e se a senha está correta.
// Os formulários HTML capturam os dados, o JavaScript processa com as classes POO, e o resultado
// é exibido através de mensagens de sucesso ou erro. É um sistema completo de autenticação
// que persiste dados localmente no navegador.

// Copilot, o que são Event Listeners?
// RESPOSTA: Event Listeners são "ouvintes" que ficam esperando por eventos específicos (como clicks
// ou submissão de formulários). Quando o evento ocorre, eles executam uma função de callback.
// Por exemplo, loginForm.addEventListener('submit', ...) fica esperando o usuário enviar o formulário,
// e quando isso acontece, executa o código de validação e login. É como ter sensores que reagem
// a ações do usuário na interface.
