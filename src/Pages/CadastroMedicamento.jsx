import { useState } from "react";
import logoOk from "../Images/right.gif";
import bootstrap from "bootstrap/dist/js/bootstrap";
import HomePageNav from "../Components/HomePageNav";

export default function CadastroMedicamento() {
  const [medicamentos, setMedicamentos] = useState({
    medicamento: "",
    laboratorio: "",
    dosagem: "",
    tipo: "",
    precoUnitario: "",
    descricao: "",
  });
  function cadastrarMedicamento(e) {
    let cadastro = JSON.parse(localStorage.getItem("Medicamentos")) ?? [];
    cadastro.push(medicamentos);
    localStorage.setItem("Medicamentos", JSON.stringify(cadastro));
    var modal = new bootstrap.Modal(document.getElementById("medicamentoCadastrado"), {
      keyboard: true,
    });
    modal.show();
    setMedicamentos({
      medicamento: "",
      laboratorio: "",
      dosagem: "",
      tipo: "",
      precoUnitario: "",
      descricao: "",
    });
    e.preventDefault();
  }
  function Limpar(e) {
    setMedicamentos({
      medicamento: "",
      laboratorio: "",
      dosagem: "",
      tipo: "",
      precoUnitario: "",
      descricao: "",
    });
    e.preventDefault();
  }
  return (
    <div>
      <HomePageNav Text="Voltar" Path="/mapa" />
      <div className="d-flex justify-content-center textos">
        <h2>Cadastro de Novo Medicamento</h2>
      </div>
      <div className="FormControl container">
        <div className="d-flex justify-content-center">
          <form onSubmit={cadastrarMedicamento} class="row g-3 ">
            <div class="col-md-6">
              <label for="Medicamento" class="form-label">
                Medicamento
              </label>
              <input required type="text" class="form-control" id="Medicamento" value={medicamentos.medicamento} onChange={(e) => setMedicamentos({ ...medicamentos, medicamento: e.target.value })} />
            </div>
            <div class="col-md-6">
              <label for="Laboratorio" class="form-label">
                Laboratório
              </label>
              <input required type="text" class="form-control" id="Laboratorio" value={medicamentos.laboratorio} onChange={(e) => setMedicamentos({ ...medicamentos, laboratorio: e.target.value })} />
            </div>
            <div class="col-md-4">
              <label for="Dosagem" class="form-label">
                Dosagem
              </label>
              <input type="text" required class="form-control" id="Dosagem" value={medicamentos.dosagem} onChange={(e) => setMedicamentos({ ...medicamentos, dosagem: e.target.value })} />
            </div>
            <div class="col-md-4">
              <label for="Tipo" class="form-label">
                Tipo
              </label>
              <select class="form-control" id="Tipo" required value={medicamentos.tipo} onChange={(e) => setMedicamentos({ ...medicamentos, tipo: e.target.value })}>
                <option value=""></option>
                <option value="Medicamento Controlado">Medicamento Controlado</option>
                <option value="Medicamento Comum">Medicamento Comum</option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="PrecoUnitario" class="form-label">
                Preco Unitario
              </label>
              <input type="text" required class="form-control" id="PrecoUnitario" value={medicamentos.precoUnitario} onChange={(e) => setMedicamentos({ ...medicamentos, precoUnitario: e.target.value })} />
            </div>
            <hr></hr>
            <div class="mb-3">
              <label for="Descricao" class="form-label">
                Descricao
              </label>
              <textarea class="form-control" id="Descricao" rows="3" value={medicamentos.descricao} onChange={(e) => setMedicamentos({ ...medicamentos, descricao: e.target.value })}></textarea>
            </div>
            <div class="d-flex justify-content-end d-grid gap-3 buttonForm">
              <button class="btn btn-success btn-lg" onClick={Limpar}>
                Limpar
              </button>
              <button type="submit" class="btn btn-success btn-lg ">
                Salvar
              </button>
            </div>
          </form>
          <div class="modal fade" id="medicamentoCadastrado" tabindex="-1" aria-labelledby="medicamentoCadastrado" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div className="d-flex flex-column align-items-center ">
                    <img src={logoOk} width="200px" />
                    <p className="ModalTexto">Medicamento cadastrado!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
