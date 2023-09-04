
import factory  from "../registrations.js";

export default function regNumbers(queries) {
	
	let regTown="";
	let towns=[];
	const regs= factory();
	let error="";
	
   async function homeRoute(req, res,next) {
//await queries.create();
  

//console.log(result);
        towns=await getRegTown();

          res.render("index",{
          regNums:towns 
      });

    }


	async function getRegTown(req,res, next){


         try{
	
	              if(regTown=="All" ||regTown==""){

                        towns=await queries.getAll();

                  }

              else{

                        towns= await queries.getTown(regTown);
   
                }
  
              return towns;
              
	          res.redirect("/");
	
       }catch(err){
	                console.log(err);
         }
}


   async function recordRegNum(req,res, next){

         let town=req.body.town;
	    var reg1= req.body.reg;
	    var reg=reg1.trim().toUpperCase();
	    let code= reg[0]+reg[1];
	


        try{
        	   let townID=await queries.getID(code);
     await queries.recordReg(await regs.getRegistrationTown(reg),townID);
    error= regs.getErrorMessage();
	     
      towns=await queries.getAll();
	    
         req.flash("error",error);
	           res.redirect("/");
	
            }catch(err){
	          console.log(err);
            }


  }


  async function  deleteAll(req,res,next){

            try{

                        await queries.deleteData();
                        res.redirect("/");
                  }catch(err){
                       console.log(err);

                 }

   }

async function show(req,res,next){

               regTown= req.body.town;
               towns=getRegTown();
               res.redirect("/");
  }



  return{
  getRegTown,
  recordRegNum,
  deleteAll,
  show,
  homeRoute

  }


}
