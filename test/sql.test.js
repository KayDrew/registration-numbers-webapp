import 'dotenv/config';
import assert from 'assert';
import dbQueries from '../database.js';
import pkg from 'pg-promise';
const connectionString = process.env.URL;
const Pool = pkg();
const db = Pool({
    connectionString,
    ssl: true
});

let queries= dbQueries(db);


describe('The registration numbers web app',async function(){
	
beforeEach(async function () {
	
    try {
        	
       await queries.deleteData();
           }catch(err){

         console.log(err);
}
        
}  );
      

 it('should return the total number of registration numbers that have been been recorded', async function(){
    
   let result= await queries.getAll();
   assert.equal(0, result.length);
});
             
    
    it('should return all registration numbers', async function(){
    	
    let testResult=[{"regnumber":"CA 789 567"},
    {"regnumber":"CY 789 567"},{"regnumber":"CJ 789 567"}];
    
    await queries.recordReg("CA 789 567", await queries.getID("CA"));
    await queries.recordReg("CY 789 567",await queries.getID("CY"));
    await queries.recordReg("CJ 789 567",await queries.getID( "CJ"));
    
    let result=await queries.getAll();
    
        assert.equal(JSON.stringify(testResult), JSON.stringify(result));
   });
   
  it('should return registration numbers for a specific town only', async function(){
     let testResult=[{"regnumber":"CA 789 567"}];
     let testResult1=[{"regnumber":"CJ 789 567"}];
    await queries.recordReg("CA 789 567", await queries.getID("CA"));
    await queries.recordReg("CY 789 567",await queries.getID("CY"));
    await queries.recordReg("CJ 789 567",await queries.getID( "CJ"));
    
    let result=await queries.getTown("Cape Town");
    assert.equal(JSON.stringify(testResult), JSON.stringify(result));
   
    let result1=await queries.getTown("Paarl");
    assert.equal(JSON.stringify(testResult1), JSON.stringify(result1));
     
});

  it('should not accept empty registration numbers.', async function(){
  	
   await queries.recordReg("", 1);
    let result= await queries.getAll();
   assert.equal(0, result.length);

});

       after(function () {
        db.$pool.end;
    });
    
    
    
   
});
