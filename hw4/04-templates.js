const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// REST Countries URL
const url = "https://restcountries.com/v3.1/all";

async function country_retrieval(url) {
  let global_data = await fetch(url);
  let countries_array = await global_data.json();
  return countries_array;
}

app.get("/", (req, res) => {
  // render pug template for the index.html file
  res.render("index", {
    heading: "Countries of the World",
    main: "Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world",
  });
});

app.get("/capitals", async (req, res) => {
  //Seems like a clean way to error-check with promises, return the array with async in the function and set it here, catching errors with .catch.
  let countries_list = await country_retrieval(url).catch((error) => {
    console.log(error);
  });

  //How to get pairs out of map()
  //capitals_list = countries_list.map((country) => {return {name: country.name.common, capital: country.capital}});
  let capitals_list = countries_list
    .map((country) => {
      return `${country.name.common || "Data Not Available"} - ${
        country.capital || "Data Not Available"
      }`;
    })
    .sort();

  //Prepend the enumeration to each string. This is actually not needed since the li automatically numbers.
  // capitals_list = capitals_list.map((string, i) => {return `${i}. ${string}`});

  res.render("page", {
    heading: "Countries and Capitals",
    results: capitals_list,
  });
});

app.get("/populous", async (req, res) => {
  let countries_list = await country_retrieval(url).catch((error) => {
    console.log(error);
  });

  countries_list = countries_list
    .filter((country) => country.population > 50000000)
    .sort((a, b) => b.population - a.population); //implicitly returns the value

  countries_list = countries_list.map((country) => {
    return `${country.name.common} - ${country.population.toLocaleString()}`;
  });

  res.render("page", {
    heading: "Most Populous Countries",
    results: countries_list,
  });
});

app.get("/regions", async (req, res) => {
  let countries_list = await country_retrieval(url).catch((error) => {
    console.log(error);
  });

  let regions = countries_list.reduce((prev, current) => {    //Reduce goes through the array and accumulates values. prev is the accumulator array and current is the current object.
    prev[current.region] = (prev[current.region] || 0) + 1;   //We insert a key into the acc array with prev[key] using the region of the current obj as the key, and accumulate the amount of times each region is seen.
    return prev;                                              //Return the actual accumulator array to the function.
  }, {});                                                     //We specify the initial value of the accumulator as an empty object using the last parameter of the function

  //Use the keys() array of the object to map an array of strings from the array of keys, using regions[key].
  let region_strings = Object.keys(regions).map((key) => {return `${key} - ${regions[key]}`});

  res.render("page", {
    heading: "Regions of the World",
    results: region_strings,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
