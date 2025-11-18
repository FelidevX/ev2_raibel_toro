import { Fragment } from "react/jsx-runtime";
import * as GiIcons from "react-icons/gi";

export default function Tablero({cartas, eliminarCarta}) {
    return (
        <Fragment>
            {
                cartas.length === 0 ? (
                    <h3 className="text-center">No hay cartas en la jugada</h3>
                ) : (
                    cartas.map((carta, index) => {
                        const nombreIcono = "GiCard" + carta;
                        const IconComponent = GiIcons[nombreIcono];
                        const color = carta.slice(1, -1) == "Diamond" || carta.slice(1, -1) == "Heart" ? "red" : "black";
                        return (
                            <div key={index} className="position-relative d-inline-block m-2">
                                <button 
                                    onClick={eliminarCarta(carta, index)}
                                    className="position-absolute top-0 end-0 btn text-white p-0 m-1"
                                    style={{ fontSize: '20px', lineHeight: 1 }}
                                >
                                    ×
                                </button>
                                <span className={`p-3 ${color === "red" ? "bg-danger" : "bg-dark"} rounded d-inline-block`}>
                                    {IconComponent ? <IconComponent size={40} color={"white"} /> : carta}
                                </span>
                            </div>
                        );
                    })
                )
            }
        </Fragment>
    )
}