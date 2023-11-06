
// list of all the ids and names
const idNames = ['username', 'firstName', 'lastName', 'phoneNumber', 'faxNumber', 'email', 'checkIn', 'checkOut', 'days', 'cost'];
const names = ['Username', 'First Name', 'Last Name', 'Phone Number', 'Fax Number', 'Email Address', 'Check-In Date', 'Check-Out Date']

// submit function
$('#submit').on('click', function() {
    let check = false; // keep track of if an error occured
    // checking the cost first
    if (document.getElementById(idNames[9]).value <= 0){
        document.getElementById(idNames[9]).parentElement.classList.add('has-error');
        check = true;
        if (isNaN(parseFloat(document.getElementById(idNames[9]).value)) || document.getElementById(idNames[9]).value == ""){
            toastr.error('The price is has not been calculated, please change your check-in/check-out dates.'); 
        } else {
            toastr.error('The price is negative, please change your check-in/check-out dates.'); // this was required but I made it so this never occurs
        }
    } else {
        document.getElementById(idNames[9]).parentElement.classList.remove('has-error');
    }
    // checking all other fields
    for (let i = 7; i >= 0; i--) {
        if (document.getElementById(idNames[i]).value == ""){
            document.getElementById(idNames[i]).parentElement.classList.add('has-error');
            toastr.error('Please enter a ' + names[i]);
            check = true;
        } else {
            document.getElementById(idNames[i]).parentElement.classList.remove('has-error');
        }
    }  
    if (check == false){
        toastr.success('This form has been submitted.');
    }
})

// reset function
$('#reset').on('click', function() {
    // clear everything
    for (let i = 0; i < 10; i++){
        document.getElementById(idNames[i]).value = "";
        document.getElementById(idNames[i]).parentElement.classList.remove('has-error');
    }
    // reset selectable fields
    document.getElementById("adults").value = 1;
    document.getElementById("checkIn").max = "";
    document.getElementById("checkOut").min = "";
    document.getElementById("message").value = "";
    document.getElementById("range").value = 5;
    document.getElementById("low").checked = true;
    toastr.info('This form has been reset.');
})


// if the number of adults changes update cost
$('#adults').on('change', function() {
    if (document.getElementById("checkIn").value != "" && document.getElementById("checkOut").value != ""){
        document.getElementById("cost").value = document.getElementById("days").value * document.getElementById("adults").value * 150;
    }
})

// if the check in date changes
$('#checkIn').on('change', function() {
    // make sure the user can only check out after they checkin
    document.getElementById("checkOut").min = moment(document.getElementById("checkIn").value, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
    if (document.getElementById("checkOut").value != ""){
        document.getElementById("days").value = moment(document.getElementById("checkOut").value, 'YYYY-MM-DD').diff(moment(document.getElementById("checkIn").value, 'YYYY-MM-DD'), 'days');
        document.getElementById("cost").value = document.getElementById("days").value * document.getElementById("adults").value * 150;
    } else {
        document.getElementById("days").value = "";
        document.getElementById("cost").value = "";
    }
})

// if the check out date changes
$('#checkOut').on('change', function() {
    // make sure the user can only check in before they check out
    document.getElementById("checkIn").max = moment(document.getElementById("checkOut").value, 'YYYY-MM-DD').add(-1, 'days').format('YYYY-MM-DD');
    if (document.getElementById("checkIn").value != ""){
        document.getElementById("days").value = moment(document.getElementById("checkOut").value, 'YYYY-MM-DD').diff(moment(document.getElementById("checkIn").value, 'YYYY-MM-DD'), 'days');
        document.getElementById("cost").value = document.getElementById("days").value * document.getElementById("adults").value * 150;
    } else {
        document.getElementById("days").value = "";
        document.getElementById("cost").value = "";
    }
})


