import { useState, useEffect } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap";
import logoOk from "../Images/right.gif";
import HomePageNav from "../Components/HomePageNav";
import "../Pages/Corrections.css";
export default function CadastroFarmacia() {
  const [farmacia, setFarmacia] = useState({
    razaoSocial: "",
    cnpj: "",
    nomeFantasia: "",
    email: "",
    telefone: "",
    email: "",
    celular: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    if (farmacia.cep.length === 8 || farmacia.cep.length === 9) {
      fetch(`https://viacep.com.br/ws/${farmacia.cep}/json/`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //retorno API
          if (data.erro == "true") {
            alert("Cep inválido");
          } else {
            setFarmacia({ ...farmacia, cep: data.cep, logradouro: data.logradouro, bairro: data.bairro, cidade: data.localidade, estado: data.uf });
          }
        });
    }
  }, [farmacia.cep]);
  useEffect(() => {
    fetch(`https://nominatim.openstreetmap.org/search?street=${farmacia.logradouro}&format=json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFarmacia({ ...farmacia, latitude: data[0].lat, longitude: data[0].lon });
      });
  }, [farmacia.logradouro]);
  function CadastrarFarmacia(e) {
    let cadastro = JSON.parse(localStorage.getItem("Farmacias")) ?? [];
    cadastro.push(farmacia);
    localStorage.setItem("Farmacias", JSON.stringify(cadastro));
    var modal = new bootstrap.Modal(document.getElementById("farmaciaCadastrada"), {
      keyboard: true,
    });
    modal.show();
    setFarmacia({
      razaoSocial: "",
      cnpj: "",
      nomeFantasia: "",
      email: "",
      telefone: "",
      email: "",
      celular: "",
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      complemento: "",
      latitude: "",
      longitude: "",
    });
    e.preventDefault();
  }
  function Limpar(e) {
    setFarmacia({
      razaoSocial: "",
      cnpj: "",
      nomeFantasia: "",
      email: "",
      telefone: "",
      email: "",
      celular: "",
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      complemento: "",
      latitude: "",
      longitude: "",
    });

    e.preventDefault();
  }
  return (
    <div>
      <HomePageNav Text="Voltar" Path="/mapa" />
      <div className="d-flex justify-content-center textos">
        <h2>Cadastro de Nova Farmácia</h2>
      </div>
      <div className="FormControl container ">
        <div className="d-flex justify-content-center">
          <form class="row g-3 " onSubmit={CadastrarFarmacia}>
            <div class="col-md-4">
              <label for="RazaoSocial" class="form-label">
                Razão Social
              </label>
              <input type="text" required class="form-control" id="RazaoSocial" value={farmacia.razaoSocial} onChange={(e) => setFarmacia({ ...farmacia, razaoSocial: e.target.value })} />
            </div>
            <div class="col-md-4">
              <label for="CNPJ" class="form-label">
                CNPJ
              </label>
              <input type="text" required class="form-control" id="CNPJ" value={farmacia.cnpj} onChange={(e) => setFarmacia({ ...farmacia, cnpj: e.target.value })} />
            </div>
            <div class="col-md-4">
              <label for="NomeFantasia" class="form-label">
                Nome Fantasia
              </label>
              <input type="text" required class="form-control" id="NomeFantasia" value={farmacia.nomeFantasia} onChange={(e) => setFarmacia({ ...farmacia, nomeFantasia: e.target.value })} />
            </div>
            <div class="col-md-4">
              <label for="Email" class="form-label">
                E-mail
              </label>
              <input type="email" required class="form-control" id="Email" value={farmacia.email} onChange={(e) => setFarmacia({ ...farmacia, email: e.target.value })} />
            </div>
            <div class="col-md-4">
              <label for="Telefone" class="form-label">
                Telefone
              </label>
              <input type="tel" class="form-control" id="Telefone" value={farmacia.telefone} onChange={(e) => setFarmacia({ ...farmacia, telefone: e.target.value })} />
            </div>
            <div class="col-md-4">
              <label for="Celular" class="form-label">
                Celular
              </label>
              <input type="tel" required class="form-control" id="Celular" value={farmacia.celular} onChange={(e) => setFarmacia({ ...farmacia, celular: e.target.value })} />
            </div>

            <hr></hr>
            <div class="col-md-2">
              <label for="CEP" class="form-label">
                CEP
              </label>
              <input type="text" required class="form-control" id="CEP" minLength={8} value={farmacia.cep} onChange={(e) => setFarmacia({ ...farmacia, cep: e.target.value })} />
            </div>
            <div class="col-md-8">
              <label for="Logradouro" class="form-label">
                Logradouro
              </label>
              <input type="text" class="form-control" required id="Logradouro" value={farmacia.logradouro} onChange={(e) => setFarmacia({ ...farmacia, logradouro: e.target.value })} />
            </div>
            <div class="col-md-2">
              <label for="NumeroRua" class="form-label">
                Número
              </label>
              <input type="text" class="form-control" required id="NumeroRua" value={farmacia.numero} onChange={(e) => setFarmacia({ ...farmacia, numero: e.target.value })} />
            </div>
            <div class="col-md-2">
              <label for="Bairro" class="form-label">
                Bairro
              </label>
              <input type="text" disabled required class="form-control" id="Bairro" value={farmacia.bairro} onChange={(e) => setFarmacia({ ...farmacia, bairro: e.target.value })} />
            </div>
            <div class="col-md-7">
              <label for="Cidade" class="form-label">
                Cidade
              </label>
              <input type="text" disabled required class="form-control" id="Cidade" value={farmacia.cidade} onChange={(e) => setFarmacia({ ...farmacia, cidade: e.target.value })} />
            </div>
            <div class="col-md-3">
              <label for="Estado" class="form-label">
                Estado
              </label>
              <input type="text" disabled required class="form-control" id="Estado" value={farmacia.estado} onChange={(e) => setFarmacia({ ...farmacia, estado: e.target.value })} />
            </div>
            <div class="col-md-6">
              <label for="Complemento" class="form-label">
                Complemento
              </label>
              <input type="text" class="form-control" id="Complemento" value={farmacia.complemento} onChange={(e) => setFarmacia({ ...farmacia, complemento: e.target.value })} />
            </div>
            <div class="col-md-3">
              <label for="Latitude" class="form-label">
                Latitude
              </label>
              <input type="text" disabled required class="form-control" id="Latitude" value={farmacia.latitude} onChange={(e) => setFarmacia({ ...farmacia, latitude: e.target.value })} />
            </div>
            <div class="col-md-3">
              <label for="Latitude" class="form-label">
                Longitude
              </label>
              <input type="text" disabled required class="form-control" id="Longitude" value={farmacia.longitude} onChange={(e) => setFarmacia({ ...farmacia, longitude: e.target.value })} />
            </div>
            <div class="d-flex justify-content-end d-grid gap-3 buttonForm">
              <button onClick={Limpar} class="btn btn-success btn-lg">
                Limpar
              </button>

              <button type="submit" data-bs-toggle="modal" class="btn btn-success btn-lg ">
                Salvar
              </button>
            </div>
          </form>

          <div class="modal fade" id="farmaciaCadastrada" tabindex="-1" aria-labelledby="farmaciaCadastrada" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div className="d-flex flex-column align-items-center ">
                    <img src={logoOk} width="200px" />
                    <p className="ModalTexto">Farmácia cadastrada!</p>
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
