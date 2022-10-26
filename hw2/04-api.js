/** Exercise 04 - API **/

const url = "https://restcountries.com/v3.1/all";

let results_list = document.getElementById("results");

async function country_retrieval(url) {
  let global_data = await fetch(url);
  let countries_array = await global_data.json();

  //Use a for/in loop instead of for/of to get the index number of each
  try {
    for (let i in countries_array) {
      let country = countries_array[i];
      let country_info = document.createElement("div");
      country_info.textContent = `${Number(i)+1}. ${country.name.common} - ${country.population.toLocaleString()}`;
      country_info.style.fontSize = "1.2rem";
      results_list.append(country_info);
    }
  } 
  catch (error) {
    console.error(error);
    results_list.textContent = "An error has occurred when loading the list of countries."
  }
  
}

country_retrieval(url);
