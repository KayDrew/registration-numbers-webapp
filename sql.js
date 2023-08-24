import pkg from 'pg';


export  default    function setUsers(){
	
const { Pool } = pkg;

const itemsPool = new Pool({
    connectionString: process.env.URL,
    ssl: true
});

let count=0;
let names={};
let individual={};


async function setUser(name,language){

let username=name;
let names1={};
let count=1;

try {
	const result=  await itemsPool.query(  `SELECT * FROM  users.name`  );              
        
let len=result.rows;	
     names1= result.rows[0];
     
     
     if(len.length<1){

if(username && language){
		
        const newItem = await itemsPool.query(
            `INSERT INTO users.name (name,count) VALUES ($1,$2)`, [name,count]
             );
        }
}     
     else {     
     	
     	if(username && language){
     	
     for(let i=0;i<len.length;++i){

var user=len[i];

     if(username===user.name){
     	
     count=user.count+1;
 const update=await itemsPool.query(`UPDATE users.name SET  count=$2 WHERE name=$1`,[username, count]);
username="";
}
}

}

	if(username && language){
		
        const newItem = await itemsPool.query(
            `INSERT INTO users.name (name,count) VALUES ($1,$2)`, [name,count]
             );
        }
        
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
    
    }
    
    
    async function setCount(){
    	
try {
	
        const items = await itemsPool.query(
            `SELECT * FROM  users.name`           
        );
        
        let allItems= items;
        
       count=allItems.rows.length;
             
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }    

}   


async function  setNames(){
	
try {
const result=      await itemsPool.query(
         `SELECT name FROM  users.name`           
        );
        	
     names= result.rows;
     
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    } 

}


async function deleteData(){
	
try {
         
           await itemsPool.query(
            `DELETE  FROM  users.name`           
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    } 

}

async function  getNames(){

return names;
}

async function getCount(){

return count;
}


async  function  setIndividual(name){
	
		
try {
	const result=  await itemsPool.query(  `SELECT * FROM  users.name WHERE name=$1` ,[name]);             	
     individual= result.rows[0];
     
console.log(individual);


     }catch(err){
     	
console.log(err);
}


}

async function getIndividual(){

return individual;
}

    return{

setUser,
setCount,
setNames,
getCount, 
getNames,
deleteData,
setIndividual,
getIndividual 


}
    }
    
    
  
