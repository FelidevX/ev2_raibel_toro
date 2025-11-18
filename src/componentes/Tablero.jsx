import { Fragment } from "react/jsx-runtime";
import * as GiIcons from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

export default function Tablero({cartas, eliminarCarta}) {
    return (
        <Fragment>
            {
                cartas.length === 0 ? (
                    <h3 className="text-center">No hay cartas en la jugada</h3>
                ) : (
                    <AnimatePresence>
                        {cartas.map((carta, index) => {
                            const nombreIcono = "GiCard" + carta;
                            const IconComponent = GiIcons[nombreIcono];
                            const color = carta.slice(1, -1) == "Diamond" || carta.slice(1, -1) == "Heart" ? "red" : "black";
                            return (
                                <motion.div 
                                    key={`${carta}-${index}`}
                                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0, rotate: 180 }}
                                    transition={{ duration: 0.5 }}
                                    className="position-relative d-inline-block m-2"
                                >
                                    <button 
                                        onClick={eliminarCarta(carta, index)}
                                        className="position-absolute top-0 end-0 btn text-white p-0 m-1"
                                        style={{ fontSize: '20px', lineHeight: 1, zIndex: 10 }}
                                    >
                                        ×
                                    </button>
                                    <span className={`p-3 ${color === "red" ? "bg-danger" : "bg-dark"} rounded d-inline-block`}>
                                        {IconComponent ? <IconComponent size={40} color={"white"} /> : carta}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                )
            }
        </Fragment>
    )
}