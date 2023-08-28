
export default function regNumbers(queries) {

	//test 3 string format cases
	let regex = /[a-zA-Z][\s][1-9]/g;
	let regex1 = /[a-zA-Z][\s][1-9][-][1-9]/g;
	let regex2 = /[a-zA-Z][\s][1-9][\s][1-9]/g;
	let error = "";
	async function getRegTown(req, res, next) {

		let code = req.params.reg_numbers;

		try {
			let townReg = await queries.getTown(code);

			res.redirect("/");

		} catch (err) {
			console.log(err);
		}
	}

	async function getAllTowns(req, res, next) {

		try {
			let allReg = await queries.getAll();

			res.redirect("/");

		} catch (err) {
			console.log(err);
		}
	}

	async function recordRegNum(req, res, next) {


		let reg1 = req.body.reg;
		let reg = reg1.trim().toUpperCase();

		let code = reg[0] + reg[1];

		if (reg) {

			if ((regex.test(reg) || regex1.test(reg) || regex2.test(reg)) && (reg.length >= 6 && reg.length <= 20)) {

				if (reg[0] == "C" && (reg[1] == "A" || reg[1] == "J" || reg[1] == "Y")) {

					error = "";

				}

				else {
					error = "Only registration numbers for Cape Town,Paarl & Bellville";
					reg = "";

				}

			}

			else {

				error = "Please enter a valid registration number";
				reg = "";
			}

		}

		else {

			error = "Please enter a registration number";
			reg = "";
		}

		req.flash("error", error);

		try {
			await queries.recordReg(reg, code);

			res.render("index", {
			});

		} catch (err) {
			console.log(err);
		}


	}

	return {
		getRegTown,
		getAllTowns,
		recordRegNum

	}


}



