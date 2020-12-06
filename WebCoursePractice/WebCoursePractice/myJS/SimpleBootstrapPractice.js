// jquery pageload 
$(document).ready(function () {
    db = new DbContext();
    updateCustomerTable();
});

var db = null;

// js pageload 
//(function () {
    
//    db = new DbContext();

//    updateCustomerTable();
//    //var customerModels = new Customer();

//})();


// document.getElementById('elementId').addEventListener('eventName', methodName)
//var el = document.getElementById('addressTypeId').addEventListener('change', showAddress);
document.getElementById('addressTypeId').addEventListener('change', showAddress);

$(document.body).on('change',
    '#addressTypeId',
    function () {
        const addressTypeId = $(this).val();
        showHideAddress(addressTypeId);
    });

function showHideAddress(addressTypeId) {
    if (addressTypeId > 0) {
        $("#address").show();
        if (addressTypeId == 1) {
            $("#addressLabel").text('Present Address');
        } else if (addressTypeId == 2) {
            $("#addressLabel").text('Permanent Address');
        }
    } else {
        $("#address").hide();
    }
}
//jquery wokr
//$("#editBtn").click(function() { //this method can be work when id write in html page
//    alert("yep");
//});

//$(document).on('click', '#editBtn', function() { // bombprove concept //#editBtn is id
$(document).on('click', '.edit-btn', function () { // bombprove concept //.edit-btn is class
    //const customerId = $(this).data('id'); // this use for the buttton i click
    const data = $(this).attr('data-id'); // attr means get by attribute
    //const customerId = $(this).prop('data-id'); // attr means get by attribute
    setCustomerForm(data);
});
//end

function getById(id) {
    if (hasAnyData(id)) {
        return db.Customers.find(c => c.id == id);
    }
}

//setData forEdit
function setCustomerForm(data) {
    let localData = '';
    if (!(data > 0) && isNaN(data) && hasAnyData(data) && Object.keys(data).length > 0) {
        localData = data;
    } else if (data > 0) {
        localData = getById(data);
    }
    // in jquery
    $('#customerName').val(localData.customerName);
    $('#email').val(localData.email);
    $('#contactNo').val(localData.contactNo);
    $('#addressTypeId').val(localData.addressTypeId);
    $('#address').val(localData.address);
    showHideAddress(localData.addressTypeId);
}
//end

//set textbox data

//

function showAddress() {
    //var id = el.value;
    var addressTypeId = document.getElementById('addressTypeId').value;
    var el = document.getElementById('addressDiv');
    if (addressTypeId > 0) {
        el.style.display = 'block';
    } else {
        el.style.display = 'none';
    }

    if (addressTypeId == 1) {
        document.getElementById('addressLabel').innerText = 'Present Address';
    } else if (addressTypeId == 2) {
        document.getElementById('addressLabel').innerText = 'Permanent Address';
    }
}

//elements control
//document.getElementById('customerName').addEventListener('change', validationName);
//document.getElementById('email').addEventListener('change', validationName);
//document.getElementById('contactNo').addEventListener('change', validationName);
//document.getElementById('addressTypeId').addEventListener('onChange', validateCustomerForm);

//button control
document.getElementById('submitButton').addEventListener('click', validateCustomerForm);
var name = document.getElementById('customerName').value;
document.getElementById('customerName').addEventListener('change', validateName);

// functions
function validateName(name) {
    //var name = document.getElementById('customerName').value;
    if (name.length < 4) {
        document.getElementById('nameSpan').style.display = 'block';
        document.getElementById('nameSpan').style.color = 'red';
    } else {
        document.getElementById('nameSpan').style.display = 'none';
    }
}

function validateCustomerForm() {
    var customerName = document.getElementById('customerName').value;
    var email = document.getElementById('email').value;
    var contactNo = document.getElementById('contactNo').value;
    var addressTypeId = document.getElementById('addressTypeId').selectedOptions[0].textContent;
    var address = document.getElementById('address').value;

    if (customerName == '' || customerName == undefined || customerName == null) {
        document.getElementById('nameSpan').style.display = 'block';
        return;
    } else {
        document.getElementById('nameSpan').style.display = 'none';
    }

    if (email == '' || email == undefined || email == null) {
        document.getElementById('emailSpan').style.display = 'block';
        return;
    } else {
        document.getElementById('emailSpan').style.display = 'none';
    }

    if (contactNo == '' || contactNo == undefined || contactNo == null) {
        document.getElementById('contactNoSpan').style.display = 'block';
        return ;
    } else {
        document.getElementById('contactNoSpan').style.display = 'none';
    }

    if (addressTypeId == '' || addressTypeId == undefined || addressTypeId == null) {
        document.getElementById('addressTypeIdSpan').style.display = 'block';
        return ;
    } else {
        document.getElementById('addressTypeIdSpan').style.display = 'none';
    }

    if (address == '' || address == undefined || address == null) {
        document.getElementById('addressSpan').style.display = 'block';
        return ;
    } else {
        document.getElementById('addressSpan').style.display = 'none';
    }

    const customerModel = new Customer();
    customerModel.id = db.Customers.length;
    //my think
    customerModel.customerName = customerName;
    customerModel.email = email;
    customerModel.contactNo = contactNo;
    customerModel.addressTypeId = addressTypeId;
    customerModel.address = address;

    //check unique email
    if (isEmailUnique(customerModel.email) && isContactUnique(customerModel.contactNo)) {
        db.Customers.push(customerModel);

        updateCustomerTable();

        clearForm();
    }
}

// check unique
// old js style
function isEmailUnique(data) {
    if (Array.isArray(db.Customers)) {
        for (let i = 0; i < db.Customers.length; i++) {
            if (db.Customers[i].email == data) {
                alert('Email Matched');
                return false;
            }
        }
        return true;
    }
}

// new js style
function isContactUnique(data) {
    if (Array.isArray(db.Customers)) {
        const isData = db.Customers.find(c => c.contactNo == data);
        if (isData != null) {
            return false
        } else {
            return true;
        }
    }
}

function clearForm() {
    document.getElementById('customerName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('contactNo').value = '';
    document.getElementById('addressTypeId').value = '';
    document.getElementById('address').value = '';
}

// javascript updateCustomerTable
//function updateCustomerTable() {
//    let rows = '';
//    var sl = 0;
//    if (Array.isArray(db.Customers) && db.Customers.length > 0) {
//        for (let i = 0; i < db.Customers.length; i++) {
//            const customer = db.Customers[i];
//            const slCol = ` <td> ${++sl} </td>`;
//            const customerNameCol = ` <td> ${customer.customerName} </td>`;
//            const emailCol = ` <td> ${customer.email} </td>`;
//            const contactNoCol = ` <td> ${customer.contactNo} </td>`;
//            const addressTypeIdCol = ` <td> ${customer.addressTypeId} </td>`;
//            const addressCol = ` <td> ${customer.address} </td>`;

//            const actionCol = `<td>
//                                    <button id='editBtn_${sl}' data-id='${customer.id}' type='button' class='btn btn-primary btn-sm my-2 edit-btn' >Edit</button>
//                                    <button id='removeBtn' type='button' class='btn btn-danger btn-sm remove-btn' >Remove</button>
//                                </td>`;
//            const row = `<tr>${slCol + customerNameCol + emailCol + contactNoCol + addressTypeIdCol + addressCol + actionCol}</tr>`;
//            rows += row;
//        }

//        document.getElementById('customerTbody').innerHTML = rows;
//    }
//}
//


//jquery updateCustomerTable
function updateCustomerTable() {
    $('#customerTbody').html('');

    if (Array.isArray(db.Customers) && db.Customers.length > 0) {
        $.each(db.Customers, function (i, customer) {
                const slCol = ` <td> ${++i} </td>`;
                const customerNameCol = ` <td> ${customer.customerName} </td>`;
                const emailCol = ` <td> ${customer.email} </td>`;
                const contactNoCol = ` <td> ${customer.contactNo} </td>`;
                const addressTypeIdCol = ` <td> ${customer.addressTypeId} </td>`;
                const addressCol = ` <td> ${customer.address} </td>`;

                const actionCol = `<td>
                                    <button id='editBtn_${i}' data-id='${customer.id}' type='button' class='btn btn-primary btn-sm my-2 edit-btn' >Edit</button>
                                    <button id='removeBtn_${i}' type='button' class='btn btn-danger btn-sm remove-btn' >Remove</button>
                                </td>`;
                const row = `<tr>${slCol + customerNameCol + emailCol + contactNoCol + addressTypeIdCol + addressCol + actionCol}</tr>`;
                //rows += row;
                $('#customerTbody').append(row);
            });
    }
}

// for saerch
document.getElementById('findButton').addEventListener('click', search);
var customerFilterList = [];
function search() {
    customerFilterList = [];
    const searchModel = getSearchModel();
    if (searchModel !== false && searchModel != null) {
        for (let i = 0; i < db.Customers.length; i++) {
            let customer = db.Customers[i];
            if (searchModel.name != null && customer.customerName.toLowerCase().includes(searchModel.name.toLowerCase())) {
                customerFilterList.push(customer);
            }
        }
    }

    searchCustomerTable();
}

function searchCustomerTable() {
    let rows = '';
    var sl = 0;
    if (Array.isArray(customerFilterList) && customerFilterList.length > 0) {
        for (let i = 0; i < customerFilterList.length; i++) {
            const customer = customerFilterList[i];
            const slCol = ` <td> ${++sl} </td>`;
            const customerNameCol = ` <td> ${customer.customerName} </td>`;
            const emailCol = ` <td> ${customer.email} </td>`;
            const contactNoCol = ` <td> ${customer.contactNo} </td>`;
            const addressTypeIdCol = ` <td> ${customer.addressTypeId} </td>`;
            const addressCol = ` <td> ${customer.address} </td>`;

            const row = `<tr>${slCol + customerNameCol + emailCol + contactNoCol + addressTypeIdCol + addressCol}</tr>`;
            rows += row;
        }

        document.getElementById('searchCustomerTbody').innerHTML = rows;
    }
}


function getSearchModel() {
    const model = {
        name: document.getElementById('searchName').value,
    }
    // validation if needed 
    return model;
}



function hasDataInArray(array) {
    if (Array.isArray(array) && array.length > 0) {
        return true;
    }
    return false;
}


function hasAnyData(data) {
    if (data == "" || data == undefined || data == null) {
        return false;
    }
    return true;
}