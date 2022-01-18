document.getElementById('loan-form').addEventListener('submit', function (e) {
  // hide result
  document.getElementById('results').style.display = 'none';
  // show loader
  document.getElementById('loading').style.display = 'block';

  // we want to sho the loader for only 3 second after which the result will be displayed
  setTimeout(calculateResult, 1000);

  e.preventDefault();
});

const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

// calculating result
function calculateResult(e) {
  const principal = parseFloat(amount.value); // converting the amount entered into value.
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthlyPay = (principal * x * calculatedInterest) / (x - 1);

  // checking if the monthly payment is a finite number or not. If the monthly payment is infinite, that means the user has entered some
  // wrong input
  if (isFinite(monthlyPay)) {
    monthlyPayment.value = monthlyPay.toFixed(2); // rounding the monthly payment upto 2 decimal places using .toFixed(2)
    totalPayment.value = (monthlyPay * calculatedPayments).toFixed(2);
    totalInterest.value = (monthlyPay * calculatedPayments - principal).toFixed(
      2
    );

    // displaying the result after screen loading animation
    document.getElementById('results').style.display = 'block';
    // hiding the spinner after the result is displayed
    document.getElementById('loading').style.display = 'none';
  } else {
    
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    Toastify({
      text: 'Please enter all the details correctly',
      className: 'info',
      style: {
        background: '#ff0000',
      },
      position: 'center',
    }).showToast();
  }
}
