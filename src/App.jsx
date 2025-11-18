import { useState } from "react";
import "./bootstrap.min.css";
import Tablero from "./componentes/Tablero";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

function App() {

  const jugada = {
    trio : ["3Diamonds", "3Hearts", "3Spades"],
    escala : ["4Clubs", "5Clubs", "6Clubs", "7Clubs"],
  }

  const [cartas, setCartas] = useState([]);
  const [resultado, setResultado] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaCarta = e.target.numero.value + e.target.pinta.value;
    const cantidad = comprobarCarta(nuevaCarta)

    if ( cantidad == 2 ) {
      alert("No puedes agregar más de 2 cartas iguales.");
      return;
    }
    setCartas([...cartas, nuevaCarta]);
  };

  const comprobarJugada = () => {
    const jugadaCompleta = [...jugada.trio, ...jugada.escala];

    const todasCartasPresentes = jugadaCompleta.every(carta => cartas.includes(carta));
    
    if (todasCartasPresentes) {
      setResultado("1 Escala y 1 Trío");
      addJugada(jugadaCompleta);
    } else {
      setResultado("NO FORMA JUEGO :C");
    }
  }

  const addJugada = async (jugadaCompleta) => {
    try {
      const docRef = await addDoc(collection(db, "jugadascarioca"), {
        cartas: jugadaCompleta
      });
      console.log("Jugada agregada con ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar la jugada: ", e);
    }
  }

  const eliminarCarta = (carta, index) => () => {
    console.log("Eliminando carta:", carta);
    setCartas(prev => prev.filter((c, i) => i !== index));
  }

  const comprobarCarta = (cartaa) => {
    let num = 0;

    cartas.map((carta) => {
      if(carta === cartaa){
        num++;
      }
    })
    return num;
  }

  return (
  <div>
    <h1 className="text-center">Juego Carioca</h1>
    
    <AnimatePresence mode="wait">
      {resultado && (
        <motion.h1
          key={resultado}
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className={`text-center ${resultado.includes("NO") ? "text-danger" : "text-success"}`}
        >
          {resultado}
        </motion.h1>
      )}
    </AnimatePresence>

    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-2">
      <div>
        <label>Número Carta</label>
        <input id="numero" type="text" />
        <label>Pinta</label>
        <select defaultValue="Diamonds" name="pinta" id="pinta">
          <option value="Diamonds">Diamante</option>
          <option value="Hearts">Corazón</option>
          <option value="Clubs">Trébol</option>
          <option value="Spades">Pica</option>
        </select>
        <button type="submit">Agregar</button>
      </div>
    </form>

    <button onClick={comprobarJugada}>Comprobar Jugada</button>
    <hr />
    <div>
      <Tablero cartas={cartas} eliminarCarta={eliminarCarta} />
    </div>
  </div>
  );
}

export default App;
