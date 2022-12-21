const fs = require('fs')

const countries = fs.readFileSync('countries.txt', {
	encoding: "utf8",
	flag: "r"
})
const countriesArray = countries.split(/\r?\n/)
countriesArray.pop()
const splittedCountries = countriesArray.map(country => country.split(' '))

const joinedCountryNames = splittedCountries.slice(1).map(country => {
	let regex = /[a-zA-Z]/

	const name = country.reduce((a, b) => regex.test(b) ? a.concat(` ${b}`) : a)

	let populationString
	for (const e of country) {
		if (!regex.test(e)) {
			populationString = e
			break
		}
	}
	const population = toNumber(populationString)

	const areaData = country.filter(item => !name.includes(item) && item !== populationString)
	const area = (data) => {
		if (data.length > 1) {
			data.sort((a, b) => a - b)
			return toNumber(data[data.length - 1])
		}
		else return toNumber(data[0])
	}

	const density = Number((population / area(areaData)).toFixed(2))

	return [name, population, area(areaData), density !== Infinity ? density : "Missing area data"]
})

const sortedCountriesByDensity = joinedCountryNames.sort((a, b) => b[b.length - 1] - a[a.length - 1]);

function toNumber(data) {
	if (data === undefined) {
		return 0
	} else {
		const num = data.replace(/,/g, '')
		return Number(num)
	}
}

let titles = countriesArray.shift()
titles += ' Density'
const dataToCSV = titles + '\n' + '\n' + sortedCountriesByDensity.map((country) => (country).join(" - ") + "," + "\n")
	.join("\n");

fs.writeFileSync("countries.csv", dataToCSV);