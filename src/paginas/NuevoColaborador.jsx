import { useEffect } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    colaborador,
    agregarColaborador,
    alerta,
  } = useProyectos();
  const params = useParams();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  if (!proyecto?._id) return <Alerta alerta={alerta} />;

  return (
    <>
      <h1 className="text-4xl font-black">
        Add Collaborator to the Project: {proyecto.nombre}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? (
        <p className="text-center">...</p>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5  rounded-lg shadow xs:w-full sm:w-full md:w-full lg:w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">Result:</h2>
              <div className="flex justify-between items-center">
                <p>{colaborador.nombre}</p>
                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() =>
                    agregarColaborador({
                      email: colaborador.email,
                    })
                  }
                >
                  Add to the Project
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;