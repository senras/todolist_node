const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`,
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`,
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`,
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`,
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`,
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`,
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('======================='.green);
  console.log(' Seleccione una opcion '.green);
  console.log('=======================\n'.green);
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const ENTER = [
    {
      type: 'input',
      name: 'enter',
      message: `\n Presione ${'ENTER'.green} para continuar \n`,
      validate: function (input) {
        if (input === '\n' && input === '\r') {
          return `\n Presione ${'ENTER'.green} para continuar \n`;
        }

        return true;
      },
    },
  ];
  console.log('\n');
  await inquirer.prompt(ENTER);
};

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message: message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listarTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    // El i es el indice de una tarea en el arreglo ( 0 el primero, por eso se le suma + 1 )
    const idx = `${i + 1}`;
    return {
      value: tarea.id,
      name: `${(idx + '.').green} ${tarea.desc}`,
    };
  });
  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar',
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices: choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmarBorrado = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'confirmation',
      message,
    },
  ];

  const { confirmation } = await inquirer.prompt(question);
  return confirmation;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`;
    return {
      value: tarea.id,
      name: `${(idx + '.').green} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false, // Pone  true el completadoEn si marco la tarea
    };
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarTareasBorrar,
  confirmarBorrado,
  mostrarListadoChecklist,
};
