const fs = require('fs')

interface ICountry {
	name: string,
	population: number,
	area: number,
	density: number
}
let results: ICountry[] = []; 

const countries = fs.readFileSync('./countries.txt').toString()
const countriesArray = countries.split(/\r?\n/)
const splittedCountries = countriesArray.map((country :string) => country.split(' '))

const joinedCountryNames = splittedCountries.slice(1, -1).map((country :[])=> {
	
	const regex = /[a-zA-Z]/g;
	
	// const name :string = ''
	// const population :number = 0
	// const area :number = 0

	let newCountry :ICountry = {
		name: '',
		population: 0,
		area: 0,
		density: 0
	}
	// const checkLetters = (param :string) => {
	// 	const regex = /[a-zA-Z]/g
	// 	// if (regex.test(param)) {
	// 	// 	return Number(country[country.length - 1].replace(/,/g, ''))
	// 	// } else return Number(param.replace(/,/g, ''))
	// 	if (regex.test(param)) {
	// 		return true
	// 	}
	// 	return false
	// }
	
	country.map((item: string) => (
		regex.test(item) ? newCountry.name.concat(item) : null),	
	);
	//checkLetters(item) ? name.concat(item) : null)
// 	const population = checkLetters(country[country.length - 2])
// 	const area = checkLetters(country[country.length - 1]) !== checkLetters(country[country.length - 2]) ? checkLetters(country[country.length - 1]) : 0

// 		if (country.length > 3) {
// 			return [country.slice(0, -2).join(' '), population, area] 
// 		} else return (
// 			[country[0], population, area]
// 		)
	//console.log(results)
	return results.push(newCountry)
})

// const populationDensity = joinedCountryNames.slice(0, -1).map(country => {
// 	if (country[country.length - 1] === 0){
// 		return country = [country[0], ': Wrong area data']
// 	} 
// 	const density = country[country.length - 1] !== 0 ? country[country.length - 2] / country[country.length - 1] : null
// 	country.push(density)
	
// 	return country
// })

// populationDensity.sort((a, b) => b[b.length - 1] - a[a.length-1]);

//console.dir(splittedCountries, { maxArrayLength: null });
console.log(results);