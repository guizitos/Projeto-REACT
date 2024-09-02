import React, { useState } from 'react';

// Componente que exibe o resultado da busca
function Resultado({ dados, clima }) {
  // Estilização inline para o resultado
  const estiloResultado = {
    marginTop: '20px',
    textAlign: 'center',
  };

  // Verifica se os dados estão disponíveis
  if (!dados) return null;

  return (
    <div style={estiloResultado}>
      <h2>Resultado:</h2>
      <p>Cidade: {dados.localidade}</p>
      <p>Estado: {dados.uf}</p>
      {clima && (
        <>
          <h3>Clima Atual:</h3>
          <p>Temperatura: {clima.temp_c}°C</p>
          <p>Condições: {clima.condition.text}</p>
        </>
      )}
    </div>
  );
}

// Componente principal do aplicativo
function App() {
  // Define os estados para o CEP, dados da cidade e dados climáticos
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);
  const [clima, setClima] = useState(null);

  // Chave da API WeatherAPI 
  const API_KEY = '64493fd42f4a498a8bb53555240209';

  // Função que busca os dados da API ViaCEP
  const buscarDados = async () => {
    try {
      // Faz a requisição para a API ViaCEP
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setDados(data);

      if (data.localidade) {
        // Se a cidade foi encontrada, busca o clima
        buscarClima(data.localidade);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do CEP:', error);
    }
  };

  // Função que busca os dados da API WeatherAPI
  const buscarClima = async (cidade) => {
    try {
      // Faz a requisição para a API WeatherAPI usando a cidade obtida
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cidade}&lang=pt`
      );
      const data = await response.json();

      if (data.current) {
        // Define o estado do clima com a temperatura e descrição
        setClima(data.current);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do clima:', error);
    }
  };

  // Estilização inline para os elementos principais
  const estiloContainer = {
    textAlign: 'center',
    marginTop: '50px',
  };

  const estiloInput = {
    padding: '10px',
    fontSize: '16px',
  };

  const estiloBotao = {
    padding: '10px 20px',
    fontSize: '16px',
    marginLeft: '10px',
  };

  return (
    <div style={estiloContainer}>
      <h1>Busca por CEP</h1>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        style={estiloInput}
      />
      <button onClick={buscarDados} style={estiloBotao}>
        Buscar
      </button>
      {/* Componente Resultado recebe os dados e o clima como props */}
      <Resultado dados={dados} clima={clima} />
    </div>
  );
}

export default App;
