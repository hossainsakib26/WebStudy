$(document).ready(function () {
    db = new dbSchool();
    updateTableData();
});

var db = null;
var searchList = [];

//global variables
var globalStudent = new Student();
var globalSearchStudent = new StudentSearch();

// controls
document.getElementById('name').addEventListener('keyup', isNameValid);
document.getElementById('email').addEventListener('keyup', isEmailValid);
document.getElementById('phone').addEventListener('keyup', isPhoneValid);

// buttons events
document.getElementById('SaveButton').addEventListener('click', submitForm);
document.getElementById('ClearButton').addEventListener('click', clearFields);
document.getElementById('SearchButton').addEventListener('click', searchStudent);


$(document).on('click', '.edit-btn', function () {
    const studentId = $(this).attr('data-id');

    if (studentId > 0) {
        getStudent(studentId);
    }
});

$(document).on('click', '.remove-btn', function () {
    const studentId = $(this).attr('data-id');

    const std = getById(studentId);
    removeStudent(std);
    updateTableData();
});

// functions
function submitForm() {

    if (!hasAnyData(globalStudent.id)) {
        if (isAllValid()) {
            const student = new Student();
            student.id = db.Students.length + 1;
            student.name = $('#name').val();
            student.email = $('#email').val();
            student.phone = $('#phone').val();
            student.addressTypeId = $('#addressTypeId').val();
            student.address = $('#address').val();

            db.Students.push(student);
        }
    } else if (hasAnyData(globalStudent.id)) {
        for (var i = 0; i < db.Students.length; i++) {
            let std = db.Students[i];

            if (globalStudent.id == std.id) {
                std.name = $('#name').val();
                std.email = $('#email').val(); // exists method and can not set in validation mathod. 
                std.phone = $('#phone').val();
                std.addressTypeId = $('#addressTypeId').val();
                std.address = $('#address').val();
            }
        }
    }
    updateTableData();
    clearFields();
}

// get a specific data
function getStudent(data) {

    const myData = getById(data);
    globalStudent.id = myData.id;

    // set value to input fields
    globalStudent.name = $('#name').val(myData.name);
    globalStudent.email = $('#email').val(myData.email);
    globalStudent.phone = $('#phone').val(myData.phone);
    globalStudent.addressTypeId = $('#addressTypeId').val(myData.addressTypeId);
    globalStudent.address = $('#address').val(myData.address);

    if (globalStudent.id > 0) {
        $('#btnName').html('Update');
    }
}

function getById(id) {
    let data = db.Students.find(c => c.id == id);
    return data;
}

function clearFields() {
    $('#name').val('');
    $('#email').val('');
    $('#phone').val('');
    //$('#addressTypeId').val('');
    $('#address').val('');

    $('#btnName').html('Save');
}

function removeStudent(data) { // remove a student
    let indexNo = db.Students.indexOf(data);
    let deleteData = db.Students.splice(indexNo, 1);
    console.log(deleteData);
    return db.Students;
}

function updateTableData() {
    $('#dataTable').html(''); // clear all data

    if (Array.isArray(db.Students) && db.Students.length > 0) {
        $.each(db.Students, function (i, student) {
            // get all single values and set them in a cell
            const idCol = `<td>${++i}</td>`;
            const nameCol = `<td>${student.name}</td>`;
            const emailCol = `<td>${student.email}</td>`;
            const phoneCol = `<td>${student.phone}</td>`;
            const addressTypeCol = `<td>${student.addressTypeId}</td>`;
            const addressCol = `<td>${student.address}</td>`;
            const actionCol = `<td>
                    <button id='EditBtn_${i}' type='button' data-id='${student.id}' class='btn btn-outline-warning btn-sm my-1 edit-btn'><i class="fa fa-pencil-square-o"></i></button>
                    <button id='RemoveItemBtn_${i}' type='button' data-id='${student.id}' class='btn btn-outline-danger btn-sm my-1 remove-btn'><i class="fa fa-trash"></i> </button>
                        </td>`;

            // make a row with these cell
            const row = `<tr>${idCol + nameCol + emailCol + phoneCol + addressTypeCol + addressCol + actionCol}</tr>`;
            $('#dataTable').append(row);
        });
    }
}

function isAllValid() { // confirm all validation

    let nameOk = isNameValid();
    let emailOk = isEmailValid();
    let phoneOk = isPhoneValid();

    if (nameOk && emailOk && phoneOk) {
        return true;
    } else {
        return false;
    }
}

// get search values
function searchStudent() {
    searchList = [];
    const searchModelData = getSearchData();
    if (searchModelData !== false && searchModelData != null) {
        for (let i = 0; i < db.Students.length; i++) {
            let student = db.Students[i];
            if (hasAnyData(searchModelData.name)) {
                if (student.name.toLowerCase().includes(searchModelData.name.toLowerCase())) {
                    searchList.push(student);
                }
            }
            if (hasAnyData(searchModelData.email)) {
                if (student.email.toLowerCase().includes(searchModelData.email.toLowerCase())) {
                    searchList.push(student);
                }
            }
        }
    }
    searchTableData();
}

// take search value
function getSearchData() {
    let searchData = new StudentSearch();
    let name = $('#searchName').val();
    let email = $('#searchEmail').val();
    if (hasAnyData(name) || hasAnyData(email)) {
        searchData.name = name;
        searchData.email = email
    }

    return searchData;
}

// search table
function searchTableData() {
    $('#searchDataTable').html(''); // clear all data

    if (Array.isArray(searchList) && searchList.length > 0) {
        $.each(searchList, function (i, student) {
            // get all single values and set them in a cell
            const idSCol = `<td>${++i}</td>`;
            const nameSCol = `<td>${student.name}</td>`;
            const emailSCol = `<td>${student.email}</td>`;
            const phoneSCol = `<td>${student.phone}</td>`;
            const addressTypeSCol = `<td>${student.addressTypeId}</td>`;
            const addressSCol = `<td>${student.address}</td>`;

            // make a row with these cell
            const row = `<tr>${idSCol + nameSCol + emailSCol + phoneSCol + addressTypeSCol + addressSCol }</tr>`;
            $('#searchDataTable').append(row);
        });
    }

}

// check field data
function isNameValid() {
    let nameData = $('#name').val();
    //let nameData = document.getElementById('name').value;
    if (hasAnyData(nameData)) {
        if (nameData.length > 3) {
            //document.getElementById('nameLabel').style.color = 'black';
            $('#nameLabel').css('color', 'black');
            $('#nameLabel').html('Name');
            return true;
        } else {
            //document.getElementById('nameLabel').style.color = 'red';
            $('#nameLabel').css('color', 'red');
            $('#nameLabel').html('Name too short. Sorry!');
            return false;
        }
    }
    return false;
}

function isEmailValid() {
    let emailData = $('#email').val();

    if (hasAnyData(emailData)) {
        let emailContain = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ((emailContain).test(emailData)) {
            if (!isEmailExists(emailData)) {
                $('#emailLabel').css('color', 'red');
                $('#emailLabel').html('Email is Exists. Sorry!');
                return false;
            } else {
                $('#emailLabel').css('color', 'black');
                $('#emailLabel').html('Email');
            }
            return true;
        } else {
            $('#emailLabel').css('color', 'red');
            $('#emailLabel').html('Email was not valid. Sorry!');
            return false;
        }
    }
    return false;
}

function isPhoneValid() { // phone number validation
    let mobileNum = $('#phone').val();
    let operator = mobileNum.slice(0, 3);
    if (mobileNum.length == 11) {
        getOperatorName(operator);
        if (!isPhoneExists(mobileNum)) {
            $('#phoneLabel').css('color', 'red');
            $('#phoneLabel').html('Sorry! number already used!');
            return false;
        }
        $('#phoneLabel').css('color', 'black');
        return true;
    } else if (mobileNum.length < 11) {
        $('#phoneLabel').css('color', 'red');
        $('#phoneLabel').html('Phone number minimum 11 degit');
        return false;
    } else if (mobileNum.length > 11) {
        $('#phoneLabel').css('color', 'red');
        $('#phoneLabel').html('Phone number length is too big');
        return false;
        //hasDataInArry(mobileNum) == false && hasAnyData(mobileNum) == false
    } else if (mobileNum == '' || mobileNum.length > 0 || mobileNum == '') {
        $('#phoneLabel').css('color', 'black');
        $('#phoneLabel').html('Phone');
        return false;
    }
}

// email exist
function isEmailExists(emailData) {
    let email = db.Students.filter(c => c.email === emailData);
    if (hasAnyData(email)) {
        return false;
    }
    return true;
}

// phone exists 
function isPhoneExists(phoneData) {
    let phone = db.Students.find(c => c.phone == phoneData);
    if (hasAnyData(phone)) {
        return false;
    }
    return true;
}

// common functions check data
function hasDataInArry(dataArray) {
    if (Array.isArray(dataArray) && dataArray.length > 0) {
        return true;
    }
    return false;
}

function hasAnyData(data) {
    if (data == '' || data == undefined || data == null) {
        return false;
    }
    return true;
}

// check mobile operator
function getOperatorName(operatorName) {
    const airtel = '016';
    const blink = '019';
    const robi = '018';
    const grameen = '017';

    if (operatorName.localeCompare(airtel) == '0') {
        return $('#phoneLabel').html('Phone: Using Airtel!');
    } else if (operatorName.localeCompare(blink) == '0') {
        return $('#phoneLabel').html('Phone: Using Banglalink!');
    } else if (operatorName.localeCompare(robi) == '0') {
        return $('#phoneLabel').html('Phone: Using Robi!');
    } else if (operatorName.localeCompare(grameen) == '0') {
        return $('#phoneLabel').html('Phone: Using Grameenphone!');
    } else {
        $('#phoneLabel').css('color', 'red');
        return $('#phoneLabel').html('Phone: No operator exsts!');
    }
}