/** Exercise 01 - Fizzbuzz

Write a program that writes all the numbers from 1 to 100, with some exceptions: 
- For numbers divisible by 3, print “fizz” 
- For numbers divisible by 5 (but not 3), print “buzz” 
- For numbers divisible by 3 and 5, print “fizzbuzz”

Use console.log() to write the proper output to the command line.

**/

const fizzbuzz = () => {
  // Add your code here

  //Bad method but works
  // for (let i = 1; i <= 100; ++i)
  // {
  //   if (i % 3 == 0 && i % 5 == 0)
  //     console.log("fizzbuzz")
  //   else if (i % 3 == 0)
  //     console.log("fizz")
  //   else if (i % 5 == 0)
  //     console.log("buzz")
  //   else
  //     console.log(i)
    
  // }

  //Better method?
  for (let i = 1; i <= 100; ++i)
  {
    let printed = '';

    if (i % 3 == 0)
      printed += 'fizz';
    
    if (i % 5 == 0)
      printed += 'buzz'
    
    if (printed == '')
      printed = i;
    
    console.log(printed)
    
    
  }
};

fizzbuzz();
// 1
// 2
// fizz
// 4
// buzz
// fizz
// 7
// 8
// fizz
// buzz
// 11
// fizz
// 13
// 14
// fizzbuzz
// ...
