import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import trashBlack from "../Images/trash.png";
import HomePageNav from "../Components/HomePageNav";
export default function Mapa() {
  let farmacias = JSON.parse(localStorage.getItem("Farmacias")) ?? [];

  const [farmacia, setFarmacia] = useState(farmacias);

  useEffect(() => {
    let farmacias = JSON.parse(localStorage.getItem("Farmacias")) ?? [];
    setFarmacia(farmacias);
  }, [farmacias]);

  function deletarFarmacia(farma) {
    let resultado = farmacias.findIndex((farmacia) => farmacia.nomeFantasia == farma);
    farmacias.splice(resultado, 1);
    localStorage.setItem("Farmacias", JSON.stringify(farmacias));
  }
  return (
    <div>
      <HomePageNav Text="Sair" Path="/" />
      <div className="d-flex justify-content-center">
        <MapContainer center={[-23.6502, -46.7376]} zoom={9} scrollWheelZoom={true}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {farmacia.map((farmacia) => (
            <Marker position={[farmacia.latitude, farmacia.longitude]}>
              <Popup>
                <div className="popmapa">
                  <span>
                    <span className="textoMapa">Razão Social: </span>
                    {farmacia.razaoSocial}
                  </span>
                  <span>
                    <span className="textoMapa">CNPJ: </span>
                    {farmacia.cnpj}
                  </span>
                  <span>
                    <span className="textoMapa">Nome Fantasia: </span>
                    {farmacia.nomeFantasia}
                  </span>
                  <span>
                    <span className="textoMapa"> E-mail: </span>
                    {farmacia.email}
                  </span>
                  <span>
                    <span className="textoMapa">{farmacia.telefone === "" ? "" : "Telefone: "} </span>
                    {farmacia.telefone}
                  </span>
                  <span>
                    <span className="textoMapa">WhatsApp: </span>

                    <a href={`https://wa.me/+55${farmacia.celular}`} target="_blank">
                      {farmacia.celular}
                    </a>
                  </span>
                  <div className="d-flex justify-content-end mapaIcones">
                    <img src={trashBlack} style={{ width: "30px", cursor: "pointer" }} onClick={() => deletarFarmacia(farmacia.nomeFantasia)} />
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
