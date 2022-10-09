/** Exercise 02 - Reverse **/

let number_input = document.getElementById("input");
let submit_button = document.getElementById("reverse");
let out = document.createElement('div');
submit_button.parentElement.append(out);

submit_button.addEventListener("click", () => {   //If there is no form, the "submit" action is not triggered, so "submit" as the action in event listener would not work.

    out.style.margin = "1.5em 0 0.5em 0";

    //Reverse the number and output it
    let number = number_input.value.split("");            
    if (number.length === 8)
    {
      reversed = number.reverse();
      reversed = number.join("");
      out.textContent = `${number.join("")} --> ${reversed}`;
      out.style.color = "green";
    }
    else
    {
      out.textContent = `Error: Please enter an 8-digit number`;
      out.style.color = "red";
    }
})
