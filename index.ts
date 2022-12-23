// const fs = require("fs");
import * as fs from "fs"

const countries: string = fs.readFileSync("countries.txt", {
   encoding: "utf8",
   flag: "r",
});
const countriesArray: string[] = countries.split(/\r?\n/);
countriesArray.pop();
const splittedCountries: string[][] = countriesArray.map((country: string) => country.split(" "));

const joinedCountryNames: (string | number)[][] = splittedCountries
   .slice(1)
   .map((country) => {
      let regex = /[a-zA-Z]/;

      const name: string = country.reduce((a, b) =>
         regex.test(b) ? a.concat(` ${b}`) : a
      );

      let populationString: string = '';
      for (const e of country) {
         if (!regex.test(e)) {
            populationString = e;
            break;
         }
      }
      const population = toNumber(populationString);

      const areaData: string[] = country.filter(
         (item) => !name.includes(item) && item !== populationString
      );
      const area = (data: string[]) => {
         if (data.length > 1) {
            data.sort((a: string, b: string) => parseInt(a) - parseInt(b));
            return toNumber(data[data.length - 1]);
         } else return toNumber(data[0]);
      };

      const density: number = Number((population / area(areaData)).toFixed(2));

      return [
         name,
         population,
         area(areaData),
         density !== Infinity ? density : "Missing area data",
      ];
   });

const sortedCountriesByDensity: (string | number)[][] = joinedCountryNames.sort(
   (a: any, b: any) => b[b.length - 1] - a[a.length - 1]
);

function toNumber(data: string) {
   if (data === undefined) {
      return 0;
   } else {
      const num = data.replace(/,/g, "");
      return Number(num);
   }
}

let titles: string | undefined = countriesArray.shift();
titles += " Density";
const dataToCSV: string =
   titles +
   "\n" +
   "\n" +
   sortedCountriesByDensity
      .map((country) => country.join(" - ") + "," + "\n")
      .join("\n");

fs.writeFileSync("countries.csv", dataToCSV);
