/** Exercise 03 - Form **/
let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let form_data = {
    name: form.elements["name"].value,
    email: form.elements["email"].value,
    feedback: form.elements["feedback"].value,
    checkbox: form.elements["checkbox"].checked,
  };

  if (!form_data.feedback) form_data.feedback = "No feedback was submitted.";
  if (!form_data.checkbox) form_data.checkbox = "No, thank you."
  else
    form_data.checkbox = "Yes, I would like to join the newsletter."

  console.group("========= Form Submission =========");
  console.log(`Name: ${form_data.name}`);
  console.log(`Email: ${form_data.email}`);
  console.log(`Feedback: ${form_data.feedback}`);
  console.log(`Newsletter: ${form_data.checkbox}`);
  console.groupEnd();
});
