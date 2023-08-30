export default  function dbQueries(db){


async function  create(){

try{
     await db.none(`CREATE TABLE IF NOT EXISTS towns(name VARCHAR(255) NOT NULL, code VARCHAR(3) NOT NULL);`);
     await db.none(`CREATE TABLE IF NOT EXISTS registrationNumbers(regNumber VARCHAR(30) NOT NULL, code VARCHAR(3) NOT NULL);`);
 
   }catch(err){
        console.log(err);
   }
}


async function recordReg(reg,code){
    
   if(reg && code){
 	
      try{ 
           await db.none(`INSERT INTO registrationNumbers (regNumber,code) VALUES ($1,$2)`, [reg,code]);        
        
        }catch(err){ 
          console.log(err);      
        }
   }

}

    
async function getTown(town){

  try{
       const townName= await db.oneOrNone(`SELECT  code FROM towns WHERE  name=($1)`,[town]);	
       const result=await db.manyOrNone(`SELECT regNumber FROM registrationNumbers WHERE code=$1`,townName.code);
     
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

      console.log("deleted successfully");
       
      }catch(err){

       console.log(err);

     }

}


return{
create ,
recordReg,
getTown,
getAll,
deleteData 
}

}
