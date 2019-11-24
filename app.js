// Define UI Vars
const rateInput = document.querySelector('#rateInput');
const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const recalculBtn = document.querySelector('#but');
const addPaymentBtn = document.querySelector('#addPaymentBtn');
const sumOfPay = document.querySelector('#all-payments');
const biggestPay = document.querySelector('#biggest-payment');
const listOfPay = document.querySelector('#transactionsList');
const recalc = document.querySelector('#pln');
const maximumName = document.querySelector('#maxName');
const maximumEuro = document.querySelector('#maxEuro');
const maximumPln = document.querySelector('#maxPln');
const delBtn = document.querySelector('#delete-payment');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
 addPaymentBtn.addEventListener('click',maxPay);
 addPaymentBtn.addEventListener('click', sumOfTransactions);
addPaymentBtn.addEventListener('click', addPayment);
  amountInput.addEventListener('input', calcRate);
  rateInput.addEventListener('input', calcRate);
  rateInput.addEventListener('input', recalculateTable);
  delBtn.addEventListener('click', delList);
}

function delList(e) {
    
    while(listOfPay.rows[0]) listOfPay.deleteRow(0);
    sumOfPay.value = '';
    maximumName.innerHTML = ''; 
    maximumEuro.innerHTML = '';
    maximumPln.innerHTML = ''; 
    e.preventDefault();
}
function recalculateTable(e) {

    const listOfElements = document.getElementsByClassName('transaction');
    
   for(let a = 0; a < listOfElements.length; a++) {
       let valEur = parseFloat(listOfElements.item(a).cells[1].innerHTML); 
      
    
       let newValPln = valEur * rateInput.value;
       
       listOfElements.item(a).cells[2].innerHTML = newValPln;        
    }
    //alert(rateInput.value);
     maximumPln.innerHTML = maximumEuro.innerHTML * rateInput.value;
    //alert(valEur.value);
    e.preventDefault();
    

}
function calcRate(e) {
    
  const result = amountInput.value*rateInput.value;
  recalc.value = result.toFixed(2);
  
    e.preventDefault();
}

function addPayment(e) {
  if(nameInput.value === '' || amountInput.value ==='' || rateInput.value ==='') {
    alert('Please, fill all required fields');
  }
  else { 
  const newRow = document.createElement('tr');
  newRow.className = 'transaction';
  // Create td element
  const tdName = document.createElement('td');
  
  tdName.appendChild(document.createTextNode(nameInput.value));
    
  const tdEuro = document.createElement('td');

  tdEuro.appendChild(document.createTextNode(amountInput.value));
  
  const tdPln = document.createElement('td');

  tdPln.appendChild(document.createTextNode(recalc.value));
  
  const tdLink = document.createElement('td');
  
  tdLink.innerHTML = '<i class="fas fa-times-circle"></i>';

  // Append li to ul
  listOfPay.appendChild(newRow);
  newRow.appendChild(tdName);
  newRow.appendChild(tdEuro);
  newRow.appendChild(tdPln);
//   newRow.appendChild(tdLink);

  // Clear input
  nameInput.value = '';
  amountInput.value = '';
  rateInput.value = ''; 
  recalc.value = '';
  e.preventDefault();
 }
}

function sumOfTransactions(e){
    const listOfElements = document.getElementsByClassName('transaction');
    let sum = 0;
    // alert(listOfElements.item(0).cells[1].innerHTML);
   for(let a = 0; a < listOfElements.length; a++) {
       sum += parseFloat(listOfElements.item(a).cells[1].innerHTML);   
    }

    sum += parseFloat(amountInput.value);

     sumOfPay.value = sum;
    e.preventDefault();
}

function maxPay (e) {
    
    const listOfElements = document.getElementsByClassName('transaction');

 let maxNumb = 0;
 let maxPln;
 let maxName;
 
for(let a = 0; a < listOfElements.length; a++) {
    
    let euroValue = parseFloat(listOfElements.item(a).cells[1].innerHTML)
    if ( euroValue > maxNumb) {
        maxNumb = euroValue;
        maxPln =  parseFloat(listOfElements.item(a).cells[2].innerHTML);
        maxName = listOfElements.item(a).cells[0].innerHTML;   
    }
    
 }
 
    if(amountInput.value > maxNumb) {
          maxNumb = parseFloat(amountInput.value);
          maxPln = recalc.value;
          maxName = nameInput.value;
    }

     maximumName.innerHTML = maxName; 
     maximumEuro.innerHTML = maxNumb;
     maximumPln.innerHTML = maxPln;
     
    e.preventDefault();

}

