require('colors');
const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/operacionesIO');
console.clear();

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  // await pausa();
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        //Crear tarea
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        //Listar tareas
        tareas.ListadoCompleto();
        break;
      case '3':
        //Listar tareas completadas
        tareas.ListadoTareasCompletadas();
        break;
      case '4':
        //Listar tareas pendientes
        tareas.ListadoTareasPendientes();
        break;

      default:
        break;
    }

    guardarDB(tareas.ListadoArr);

    await pausa();
  } while (opt !== '0');
};

main();
