const http = require('http');

// Função para fazer requisições HTTP
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Testar endpoints
async function testEndpoints() {
  console.log('🚀 Testando endpoints da API...\n');

  try {
    // 1. Health Check
    console.log('1. Testando Health Check...');
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 8000,
      path: '/health',
      method: 'GET'
    });
    console.log('✅ Health Check:', healthResponse.status, healthResponse.data);
    console.log('');

    // 2. Listar jogos
    console.log('2. Testando listagem de jogos...');
    const gamesResponse = await makeRequest({
      hostname: 'localhost',
      port: 8000,
      path: '/api/games',
      method: 'GET'
    });
    console.log('✅ Listar jogos:', gamesResponse.status, gamesResponse.data);
    console.log('');

    // 3. Registrar usuário
    console.log('3. Testando registro de usuário...');
    const registerData = {
      name: 'Teste Usuário',
      email: 'teste@exemplo.com',
      password: 'Teste123'
    };
    const registerResponse = await makeRequest({
      hostname: 'localhost',
      port: 8000,
      path: '/api/auth/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, registerData);
    console.log('✅ Registro:', registerResponse.status, registerResponse.data);
    console.log('');

    // 4. Login
    console.log('4. Testando login...');
    const loginData = {
      email: 'teste@exemplo.com',
      password: 'Teste123'
    };
    const loginResponse = await makeRequest({
      hostname: 'localhost',
      port: 8000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, loginData);
    console.log('✅ Login:', loginResponse.status, loginResponse.data);
    console.log('');

    // 5. Listar categorias
    console.log('5. Testando listagem de categorias...');
    const categoriesResponse = await makeRequest({
      hostname: 'localhost',
      port: 8000,
      path: '/api/games/categories',
      method: 'GET'
    });
    console.log('✅ Categorias:', categoriesResponse.status, categoriesResponse.data);
    console.log('');

    console.log('🎉 Testes concluídos!');

  } catch (error) {
    console.error('❌ Erro ao testar endpoints:', error.message);
  }
}

// Executar testes
testEndpoints();
