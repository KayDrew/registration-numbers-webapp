import dbQueries from './database.js';
import pkg from 'pg-promise';

const connectionString=process.env.URL;
const Pool= pkg();
const db=Pool ({connectionString ,
ssl: true 
});
const queries = dbQueries(db);

export default function registrationNumbers (){

	let regex=  /[a-zA-Z][\s][1-9]/;
	let regex1=/[a-zA-Z][\s][1-9][-][1-9]/;
	let regex2=/[a-zA-Z][\s][1-9][\s][1-9]/;
	let codes={"CA":"Cape Town","CJ":"Paarl","CY":"Bellville"};
	
	let error="";


   async function getRegistrationTown(reg1){

    var reg=reg1.trim().toUpperCase();
    let code= reg[0]+reg[1];

   if(reg){

                 if((regex.test(reg) || regex1.test(reg) || regex2.test(reg)) && (reg.length>=6 && reg.length<=30)){

                              if(codes.hasOwnProperty(code)){

                                            
                                                    let result=await queries.checkReg(reg);
                                           
                                                      if(reg==result){

                                                                   error="This registration number already exists";
                                                                   reg="";
                                                                   
                                                          }

                                                         else{
                                                                   error="";
                                                              }
                                             
    
                                   }

                                else{
                                              error="Only registration numbers for Cape Town,Paarl & Bellville";
                                              reg="";
                                   }

                   }

                   else{
                                error="Please enter a valid registration number";
                                reg="";
                       }

        }

    else{
                 error="Please enter a registration number";
                 reg="";
        }
return reg;

}



function getErrorMessage(){

    return error;
}


return{

    
    getErrorMessage,
    getRegistrationTown
}

}
