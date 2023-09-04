export default  function dbQueries(db){


async function recordReg(reg,townID){


if(reg && townID){
	
    try{
    
await db.none(`INSERT INTO registrationNumbers (regNumber,townID) VALUES ($1,$2)`, [reg,townID]);


   
        }catch(err){
        
        console.log(err);
        }
}


}

async function getTown(town){

try{
	
 const result=await db.manyOrNone(`SELECT registrationNumbers.regNumber FROM registrationNumbers JOIN towns ON registrationNumbers.townID=towns.townID WHERE towns.name=$1`, town);

return result;

}catch(err){

console.log(err);
}

}

async function getAll(){

try{
const result=await db.manyOrNone(`SELECT regNumber FROM registrationNumbers`);


return result;

}catch(err){

console.log(err);
}

}

async function deleteData(){

try {

await db.none(`DELETE FROM registrationNumbers`);


}catch(err){

console.log(err);

}

}

async function getID(code){

  if(code){
	
   try{  
     
    let query =await db.manyOrNone (`SELECT townID from towns WHERE  code=$1`, code);
    let result= query[0]

    if(result){
	
    return result.townid;
   }

}
catch(err){

    console.log(err);
  }

 }

}

async function checkReg(reg){

if(reg){
	
try{

const result= await db.oneOrNone(`SELECT  regNumber FROM registrationNumbers WHERE regNumber=$1`, reg);

if(result){
return result.regnumber;

}
}catch(err){

console.log(err);
}

}

}

return{
create ,
recordReg,
getTown,
getAll,
deleteData,
getID,
checkReg
}

     }
