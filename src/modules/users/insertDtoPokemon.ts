import { getConnection } from "typeorm";
import { UserEntity } from './user.entity';
import { environment } from '../../../environment/environment';

// Con esto se mete los pokemon una vez
var xlsx = require('node-xlsx');

//Poner en la ruta __dirname para que lo coga directamente
var obj = xlsx.parse('/Users/Sergio Mesas Yélamos/NoPuedoBorrar/Escritorio/backend_login/appLogin_backend' + '/pokemonData.xlsx'); // parses a file

export function cargarPokemon(){
    for (var i = 1; i <= 149; i++) {


    const insertPokemon = getConnection()
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values([
        { img: environment.url.img+obj[0].data[i][0],
            email: obj[0].data[i][1],
            name: obj[0].data[i][2],
            password: obj[0].data[i][3],
            type: obj[0].data[i][4],
            ability: obj[0].data[i][5],
            speed: obj[0].data[i][6],
            weight: obj[0].data[i][7],
            height: obj[0].data[i][8],
            description: obj[0].data[i][9],
        },
    ])
    .execute() 
    }
    console.log('datos cargados');
}


