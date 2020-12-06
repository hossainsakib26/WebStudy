var customerList = [];

// form load
(function () {

})();

//controls
//document.getElementById('addressTypeId').addEventListener('change', showAddressWithType);
document.getElementById('customerName').addEventListener('keyup', checkName);
document.getElementById('email').addEventListener('keyup', checkEmail);

//button events
document.getElementById('saveButton').addEventListener('click', SaveCustomer);
document.getElementById('clearButton').addEventListener('click', clearData);

// variables
// check purpose
var aValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// -- catch a value

// -- catch html tag

//function
function showAddressWithType() { // hide and show address div method
    let getAddressTypeId = document.getElementById('addressTypeId').value;
    let addressDiv = document.getElementById('addressDiv');

    if (getAddressTypeId == 1 || getAddressTypeId == 2) {
        addressDiv.style.visibility = 'visible';
        // label name change
        if (getAddressTypeId == 2) {
            document.getElementById('addressLabel').innerText = 'Present Address';
        } else if (getAddressTypeId == 1) {
            document.getElementById('addressLabel').innerText = 'Permanent Address';
        }
        //eng label name change
    } else {
        addressDiv.style.visibility = 'hidden';
    }
}

function checkName() {
    let name = document.getElementById('customerName').value;
    let errorNameSpan = document.getElementById('errorCustomerName');
    if (hasData(name)) {
        errorNameSpan.style.display = 'none';
        if (name.length < 3) {
            document.getElementById('errorCustomerName').textContent = 'Lenght is too small';
            errorNameSpan.style.display = 'block';
            return;
        }
    } else if (!hasData(name)) {
        errorNameSpan.style.display = 'block';
        errorNameSpan.innerText = 'Name Required';
        return;
    }
}

function checkEmail() {
    let email = document.getElementById('email').value;

    if (emailPaterns(email)) {
        document.getElementById('errorEmail').style.visibility = 'hidden';
    } else {
        document.getElementById('errorEmail').style.visibility = 'visible';
        document.getElementById('errorEmail').textContent = 'The email you entered is not matching with email pattern';
        return;
    }
}

function SaveCustomer() {
    const customer = new MyCustomer();
    customer.id = customerList.length;
    customer.customerName = document.getElementById('customerName').value;
    customer.email = document.getElementById('email').value;
    customer.phone = document.getElementById('phone').value;
    customer.addressTypeId = document.getElementById('addressTypeId').selectedOptions[0].textContent;
    customer.address = document.getElementById('address').value;

    customerList.push(customer);
    //clearData();
    updateCustomerDataTable();
}

function clearData() {
    document.getElementById('customerName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('addressTypeId').value = '';
    document.getElementById('address').value = '';
}

function updateCustomerDataTable() {
    let rows = '';
    let sl = 0;
    if (Array.isArray(customerList) && customerList.length > 0) {
        for (let i = 0; i < customerList.length; i++) {
            const customer = customerList[i];
            const tdSl = ` <td> ${++sl} </td>`;
            const tdId = `<td style = "display: none">${customer.id}</td>`;
            const tdName = ` <td> ${customer.customerName} </td>`;
            const tdEmail = ` <td> ${customer.email} </td>`;
            const tdPhone = ` <td> ${customer.phone} </td>`;
            const tdAddressType = ` <td> ${customer.addressTypeId} </td>`;
            const tdAddress = ` <td> ${customer.address} </td>`;

            const tdAction = `<td>
                                    <button id='editBtn' type='button' class='btn btn-primary btn-sm' >Edit</button>
                                    <button id='editBtn' type='button' class='btn btn-danger btn-sm' >Remove</button>
                                </td>`;
            const row = `<tr>${tdSl + tdName + tdEmail + tdPhone + tdAddressType + tdAddress + tdAction}</tr>`;
            rows += row;
        }
        document.getElementById('customerData').innerHTML = rows;
    }
}

// check all kinds of values and patterns
function hasData(datam) { // check string values
    if (datam == '' || datam == undefined || datam == null) {
        return false;
    } else {
        return true;
    }
}

function emailPaterns(email) { //email patern
    if (email.match(aValidEmail)) {
        return true;
    }
    return false;
}