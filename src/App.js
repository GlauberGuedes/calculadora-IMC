import {useState, useRef, useEffect} from 'react';
import './App.css';

function App() {
  const [peso, setPeso] = useState(0);
  const [ altura, setAltura] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [classificacao, setClassificacao] = useState("");
  const verificacao = useRef(false);
  const [tema, setTema] = useState(localStorage.getItem("tema") ?? "claro");

  useEffect(() => {
    if(resultado >= 30) {
      setClassificacao("Obesidade");
    } else if(resultado < 18.5) {
      setClassificacao("Peso baixo");
    } else if (resultado >= 18.5 && resultado < 25) {
      setClassificacao("Peso normal");
    } else if (resultado >= 25 && resultado < 30) {
      setClassificacao("Sobre peso");
    } else if (!Number(resultado)) {
      setClassificacao(" erro: Digite os valores corretamente.")
    }
  },[resultado])
  
  const calculoIMC = () => {
    setResultado((peso / (altura * altura)).toFixed(1));
    verificacao.current = true;
  }

 

  function trocaTema () {
    const novotema = tema === "claro" ? "escuro" : "claro";
    setTema(novotema);

    localStorage.setItem("tema", novotema);

  }

  return (
    <div className={tema === "claro" ? "container" : "container-escuro"}>
      <div className={tema === "claro" ? "calculadora" : "calculadora-escuro"}>
        <div className="titulo">
          <h1>Calculadora de IMC</h1>
          <button onClick={trocaTema}>{tema === "claro" ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i>}</button>
        </div>
        <div className="inputs">
          <input placeholder="Peso..."  onChange={(e) => setPeso(e.target.value)}/>
          <input placeholder="Altura..." onChange={(e) => setAltura(e.target.value)}/>
        </div>
        <p>As casa decimais da altura e do peso tem que ser passado com "." e não ","</p>
        <button id="verificar" onClick={calculoIMC}>Verificar</button>
        <div className={verificacao.current === false ? "resultado-none" : "resultado" }>{resultado > 0 ? `Seu imc é ${resultado} e vc está com ${classificacao}` : `${classificacao}`}</div>
      </div>
      <div className={tema === "claro" ? "informacoes" : "informacoes-escuro"}>
        <div className="informacoes-imc">
          <ul>
            <li>IMC</li>
            <li>Menor que 18.5</li>
            <li>18.5 até 24.9</li>
            <li>25 até 29.9</li>
            <li>acima de 30</li>
          </ul>
        </div>
        <div className="informacoes-classificacao">
          <ul>
            <li>CLASSIFICAÇÃO</li>
            <li>Peso baixo</li>
            <li>Peso normal</li>
            <li>Sobre peso</li>
            <li>Obesidade</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
