const Tarea = require("./tarea");
require("colors");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get ListadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  crearTarea(desc) {
    const tarea = new Tarea();
    tarea.desc = desc;
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray = (tareas = []) => {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  };

  ListadoCompleto() {
    let cont = 1;
    this.ListadoArr.forEach((tarea) => {
      const { completadoEn, desc } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      console.log(`${`${cont}`.green} ${desc} :: ${estado}`);
      cont = cont + 1;
    });
  }

  ListadoTareasCompletadas() {
    let cont = 1;
    this.ListadoArr.forEach((tarea) => {
      const { completadoEn, desc } = tarea;
      if (completadoEn) {
        console.log(
          `${cont.toString().green} ${desc} :: ${
            completadoEn.toString().green
          } `
        );
        cont = cont + 1;
      }
    });
  }

  ListadoTareasPendientes() {
    let cont = 1;
    this.ListadoArr.forEach((tarea) => {
      const { completadoEn, desc } = tarea;
      if (!completadoEn) {
        console.log(`${cont.toString().green} ${desc} :: ${"Pendiente".red} `);
        cont = cont + 1;
      }
    });
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.ListadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
