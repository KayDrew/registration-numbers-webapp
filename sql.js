export default  function dbQueries(db){

async function  create(){

try{
await db.none(`CREATE TABLE IF NOT EXISTS towns(name VARCHAR(255) NOT NULL, code VARCHAR(3) NOT NULL);`);
await db.none(`CREATE TABLE IF NOT EXISTS registrationNumbers(regNumber VARCHAR(12) NOT NULL, code VARCHAR(3) NOT NULL);`);

console.log("created two tables");
} catch(err){

console.log(err);

}
}


async function recordReg(reg,code){

    try{
        await db.none(`INSERT INTO registrationNumbers (regNumber,code) VALUES ($1,$2)`,[reg,code]);
        
        console.log("inserted "+reg+"code: "+code);
        }catch(err){
        
        console.log(err);
        }

}

async function getTown(code){

try{
const result=await db.oneOrNone(`SELECT name FROM towns WHERE code= ($1)`,[code]);

return result.name;

}catch(err){

console.log(err);
}

}

async function getAll(){

try{
const result=await db.manyOrNone(`SELECT regNumber FROM registrationNumbers`);

console.log(result);
return result;

}catch(err){

console.log(err);
}

}


return{
create ,
recordReg,
getTown,
getAll
}

}