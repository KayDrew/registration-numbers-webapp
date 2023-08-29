export default function regNumbers(queries) {
	
	let regex=  /[a-zA-Z][\s][1-9]/;
	let regex1=/[a-zA-Z][\s][1-9][-][1-9]/;
	let regex2=/[a-zA-Z][\s][1-9][\s][1-9]/;
	let towns=[];
	let regTown="";
	let error="";
	
   async function homeRoute(req, res,next) {
  
       let towns=await getRegTown();

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
	
	   if(reg){

                     if((regex.test(reg) || regex1.test(reg) || regex2.test(reg)) && (reg.length>=6 && reg.length<=30)){

                                  if(reg[0]=="C" && (reg[1]=="A" || reg[1]=="J" || reg[1]=="Y")){

                                                let result=await queries.getAll();

                                               for(let i=0;i<result.length;++i){

                                                          if(reg==result[i].regnumber){

                                                                       error="This registration number already exists";
                                                                       reg="";
                                                                       break;
                                                              }

                                                             else{
                                                                       error="";
                                                                  }
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

        req.flash("error",error);


        try{
	           await queries.recordReg(reg,code);
	           towns= getRegTown();
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



