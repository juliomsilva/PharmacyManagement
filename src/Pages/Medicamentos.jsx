import HomePageNav from "../Components/HomePageNav";

import trash from "../Images/trash.png";

import { useState, useEffect } from "react";
import "../Pages/Corrections.css";
import Modal from "../Components/Modal";
import { Link } from "react-router-dom";

export default function Medicamentos() {
  let medicamento = JSON.parse(localStorage.getItem("Medicamentos")) ?? [];
  const [modal, setModal] = useState(false);
  const [dados, setDados] = useState([]);
  const [filtrado, setFiltro] = useState(medicamento);
  const [termo, setTermo] = useState("");
  useEffect(() => {
    setFiltro(
      medicamento.filter((item) => {
        if (item.medicamento.toLocaleLowerCase().indexOf(termo.toLocaleLowerCase()) !== -1) {
          return item;
        }
      })
    );
  }, [termo]);
  function deletarMedicamento(medicamentos) {
    let resultado = medicamento.findIndex((medicamento) => medicamento.medicamento == medicamentos);
    medicamento.splice(resultado, 1);
    localStorage.setItem("Medicamentos", JSON.stringify(medicamento));
    setFiltro(medicamento);
  }
  function Detalhar(medicamento) {
    let dados = [medicamento.medicamento, medicamento.laboratorio, medicamento.dosagem, medicamento.tipo, medicamento.precoUnitario, medicamento.descricao];
    setDados(() => [...dados]);
    return setModal(true);
  }

  return (
    <div>
      <HomePageNav Text="Voltar" Path="/mapa" />
      <div className="d-flex searchDiv">
        <input type="text" className="searchMedicamento" value={termo} onChange={(e) => setTermo(e.target.value)} placeholder="Busque um medicamento..." />
        <div className="novoMedicamentoBtn">
          <Link to="/CadastroMedicamento">
            <button type="button" class="btn btn-outline-success btn-sm">
              + Cadastrar medicamento
            </button>
          </Link>
        </div>
      </div>

      <hr className="Linha"></hr>
      <div className="d-flex flex-wrap">
        {filtrado.map((medicamento) => (
          <div class="card text-bg-light mb-3" style={{ width: "12rem", marginLeft: "10px" }}>
            <img onClick={() => Detalhar(medicamento)} style={{ cursor: "pointer" }} src="https://precopopular.vteximg.com.br/arquivos/ids/187424-1000-1000/rotulo_pp_generico_receita.jpg?v=637838325846570000" class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text text-center" style={{ fontWeight: 700, fontSize: "20px" }}>
                {medicamento.medicamento} {medicamento.dosagem}
              </p>
              <p class="card-text text-center" style={{ fontWeight: 700, fontSize: "14px" }}>
                {medicamento.laboratorio}
              </p>
              <div class="d-flex justify-content-end containerIcones">
                <img src={trash} style={{ width: "30px", cursor: "pointer" }} onClick={() => deletarMedicamento(medicamento.medicamento)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal === true ? <Modal medicamento={dados[0]} laboratorio={dados[1]} dosagem={dados[2]} tipo={dados[3]} precoUnitario={dados[4]} descricao={dados[5]} hide={() => setModal(false)} /> : ""}
    </div>
  );
}
