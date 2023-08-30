import 'dotenv/config';
import assert from 'assert';
import dbQueries from '../sql.js';
import pkg from 'pg-promise';
const connectionString = process.env.URL;
const Pool = pkg();
const db = Pool({
    connectionString,
    ssl: true
});

let query= dbQueries1(db);


describe('The greeting web app',async function(){
	
beforeEach(async function () {
	
    try {
        	
       await query.deleteData();
           }catch(err){

         console.log(err);
}
        
}  );
      
   

 it('should return the total number of registration numbers that have been been recorded', async function(){
       assert.equal(0, await queries.getAll().length);
});
        
        
    
    it('should return all registration numbers', async function(){
                          
   });
   	

       after(function () {
        db.$pool.end;
    });
    
    
    
   
});
