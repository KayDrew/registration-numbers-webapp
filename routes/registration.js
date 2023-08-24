
let button = document.querySelector(".submit");
let input = document.querySelector(".inputText");
let menu = document.querySelector(".menu");
let display = document.querySelector(".displayNumbers");
let filter = document.querySelector(".filter");
let select = document.querySelector(".select");
let errorMessage = document.querySelector("#errorMessage");
let regNumber = "";
let count = 1;

let registrationNumbers = {};
let capeRegNumbers = {};
let paarlRegNumbers = {}
let bellvilleRegNumbers = {};
let regNum = "";
let regex = /[A-Z][\s][1-9]/g;


function addRegNumbers() {

	regNumber = input.value;
	let varr = "reg_number" + count;
	if (regNumber) {

		if (regNumber.length > 6 && regNumber.length < 9) {

			regNum = regNumber.trim().toUpperCase();


				
				if (!(registrationNumbers.hasOwnProperty(regNum))) {

					if (regNum.substring(0, 2) === "CA") {

						count++;
						capeRegNumbers[regNum] = varr;
						registrationNumbers[regNum] = "Cape Town";

						var para = document.createElement("p");
						para.innerText = regNum;
						para.style.background = "#FFE1A0";
						para.style.width = "100px";
						para.style.borderRadius = "2px 2px";
						display.appendChild(para);

					}

					else if (regNum.substring(0, 2) === "CJ") {

						count++;
						paarlRegNumbers[regNum] = varr;
						registrationNumbers[regNum] = "Paarl";

						console.log(JSON.stringify(registrationNumbers));

						var para = document.createElement("p");
						para.innerText = regNum;
						para.style.background = "#FFE1A0";
						para.style.width = "100px";
						para.style.borderRadius = "2px 2px";
						display.appendChild(para);
					}

					else if (regNum.substring(0, 2) === "CY") {

						count++;
						bellvilleRegNumbers[regNum] = varr;

						var para = document.createElement("p");
						para.innerText = regNum;
						para.style.background = "#FFE1A0";
						para.style.width = "100px";
						para.style.borderRadius = "2px 2px";
						display.appendChild(para);

					}


					else {

						errorMessage.style.display = "block";
						errorMessage.innerHTML = "Only registration  numbers for Cape Town,  Paarl and Bellville  are accepted";

						setTimeout(
							function () {
								errorMessage.style.display = "none";

							}, 3500
						);

						clearTimeout();
					}


				}

				else{


					
					errorMessage.style.display = "block";
					errorMessage.innerHTML = "registration number already exists";

					setTimeout(
						function () {
							errorMessage.style.display = "none";

						}, 3500
					);

					clearTimeout();
				}

			

		}

		else{
			
			
			errorMessage.style.display = "block";
			errorMessage.innerHTML = "Please enter a valid registration number";

			setTimeout(
				function () {
					errorMessage.style.display = "none";

				}, 3500
			);

			clearTimeout();
		}

	}


		else{
			errorMessage.style.display = "block";
			errorMessage.innerHTML = "No registration Number Entered.";

			setTimeout(
				function () {
					errorMessage.style.display = "none";

				}, 3500
			);

			clearTimeout();


		}


}


button.addEventListener("click", addRegNumbers);

function show() {

	while (display.hasChildNodes()) {
		display.removeChild(display.firstChild);
	}

	if (select.value === "All") {

		for (let reg in registrationNumbers) {

			var para = document.createElement("p");
			para.innerText = reg;
			para.style.background = "#FFE1A0";
			para.style.width = "100px";
			para.style.borderRadius = "2px 2px";
			display.appendChild(para);
		}
	}

	else if (select.value === "Cape Town") {

		for (let reg in capeRegNumbers) {

			var para = document.createElement("p");
			para.innerText = reg;
			para.style.background = "#FFE1A0";
			para.style.width = "100px";
			para.style.borderRadius = "2px 2px";
			display.appendChild(para);
		}


	}

	else if (select.value === "Paarl") {

		for (let reg in paarlRegNumbers) {

			var para = document.createElement("p");
			para.innerText = reg;
			para.style.background = "#FFE1A0";
			para.style.width = "100px";
			para.style.borderRadius = "2px 2px";
			display.appendChild(para);
		}
	}

	else if (select.value === "Bellville") {

		for (let reg in bellvilleRegNumbers) {

			var para = document.createElement("p");
			para.innerText = reg;
			para.style.background = "#FFE1A0";
			para.style.width = "100px";
			para.style.borderRadius = "2px 2px";
			display.appendChild(para);
		}

	}

}


filter.addEventListener("click", show);
