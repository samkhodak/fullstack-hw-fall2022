/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  amount_string = `$${input} ==> `

  if (input > 10)
    return amount_string + "Error: the number is too large";

  //n will keep track of the remaining dollar amount that is to be divided. 
  n = input * 100;


  dollars = calculate_coins(n, 100);
  n-= dollars * 100;
  if (dollars)
    amount_string += dollars > 1 ? `${dollars} dollars, ` : `${dollars} dollar, `;


  quarters = calculate_coins(n, 25);
  n -= quarters * 25;
  if (quarters)
    amount_string += quarters > 1 ? `${quarters} quarters, ` : `${quarters} quarter, `;


  dimes = calculate_coins(n, 10);
  n -= dimes * 10;
  if (dimes)
    amount_string += dimes > 1 ? `${dimes} dimes, ` : `${dimes} dime, `;


  nickels = calculate_coins(n, 5);
  n -= nickels * 5;
  if (nickels)
    amount_string += nickels > 1 ? `${nickels} nickels, ` : `${nickels} nickel, `;


  pennies = calculate_coins(n, 1);
  if (pennies)
    amount_string += pennies > 1 ? `${pennies} pennies ` : `${pennies} penny `;


  return amount_string;
};


//Returns the number of each coin in the total amount, by value.
function calculate_coins(total_amount, coin_value)
{
  remainder = total_amount % coin_value;
  total_amount -= remainder;
  return total_amount / coin_value;
}

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
