import Table from 'cli-table';

const red = "\x1b[31m"; // Rojo
const green = "\x1b[32m"; // Verde
const reset = "\x1b[0m"; // Restablecer el color

let title = ""
let numLoop = 0
let totalLoop = 0
let status = ""

let totalLessFood = 0
let totalLessAmmo = 0
let totalLessFuel = 0

let nameGiveMiner = ""
let totalGiveMiner = 0

let actualStatus: StatusAction[] = [];

export class ScreenPrint {
    printiScreen() {
        console.clear();
        console.log("")
        console.log("")
        console.log(`${green}`+title+`${reset}`);
        console.log(`${red}|||||||||||||| Loops ${numLoop} of ${totalLoop} ||||||||||||||${reset}`);

        const balances = new Table({
            head: ['Resource', 'Balance'],
            colWidths: [20, 20],
        });

        // Agrega datos a la tabla
        balances.push(["Fuel", `${red}`+totalLessFuel+`${reset}`]);
        balances.push(["AMMO", `${red}`+totalLessAmmo+`${reset}`]);
        balances.push(["Food", `${red}`+totalLessFood+`${reset}`]);
        balances.push([`${nameGiveMiner}`, `${green}+`+totalGiveMiner+`${reset}`]);

        // Imprime la tabla en la consola
        console.log(balances.toString());

        console.log("")
        console.log("")
        console.log(`Actual Status: ${status}`);

        const actualsStatus = new Table({
            head: ['Action', 'Status'],
            colWidths: [20, 20],
        });

        actualStatus.forEach((item) => {
            actualsStatus.push([`${item.name}`, `${item.status}`]);
        });

        // Imprime la tabla en la consola
        console.log(actualsStatus.toString());

    }

    setTotalLoop(total: number) {
        totalLoop = total;
    }

    setNumLoop(num: number) {
        numLoop = num;
    }

    setTotalLessFood(total: number) {
        totalLessFood = total;
    }

    setTotalLessAmmo(total: number) {
        totalLessAmmo = total;
    }

    setTotalLessFuel(total: number) {
        totalLessFuel = total;
    }

    setTotalGiveMiner(total: number) {
        totalGiveMiner = total;
    }

    setTitle(tit: string) {
        title = tit;
    }

    setStatus(st: string) {
        status = st;
    }

    setNameMiner(name:string) {
        nameGiveMiner = name;
    }

    addActualStatus(name: string, status: string) {
        const action = new StatusAction(name, status);
        actualStatus.push(action);
    }

    editarStatus(statusName: string, newStatus: string) {
        actualStatus.forEach((item) => {
          if (item.name === statusName) {
            item.status = newStatus;
          }
        });
      }

      newLoop() {
        actualStatus = [];
      }

}

class StatusAction {
    constructor(public name: string, public status: string) {}
}

function imprimirTextoCentrado(texto: string) {
    // Obtiene el ancho de la consola
    const anchoConsola = process.stdout.columns;

    // Calcula la cantidad de espacios necesarios para centrar el texto
    const espacios = Math.max(0, (anchoConsola - texto.length) / 2);

    // Crea una cadena con los espacios necesarios y el texto centrado
    const textoCentrado = ' '.repeat(espacios) + texto;

    // Imprime el texto centrado en la consola
    console.log(textoCentrado);
}

