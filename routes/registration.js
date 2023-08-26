
export default function regNumbers(queries) {
	
	
	async function getRegTown(req,res, next){

let code= req.params.reg_numbers;

try{
	let townReg=await queries.getTown(code);
	
	res.redirect("/");
	
}catch(err){
	console.log(err);
}
}

async function getAllTowns(req,res, next){
	try{
	let allReg=await queries.getAll();
	
	res.redirect("/");
	
}catch(err){
	console.log(err);
}
}


async function recordRegNum(req,res, next){

	let reg= req.body.reg;

	let code= reg[0]+reg[1];
	try{
	await queries.recordReg(reg,code);
	
	res.redirect("/");
	
}catch(err){
	console.log(err);
}
}



return{
getRegTown,
getAllTowns

}


}



