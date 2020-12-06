//var db = null;
$(document).ready(function () {
    db = new dbSchool();
    updateTableData();
});

var db = null;
// controls

document.getElementById('name').addEventListener('keyup', isNameValid);
document.getElementById('email').addEventListener('keyup', isEmailValid);
document.getElementById('phone').addEventListener('keyup', isPhoneValid);


// buttons events
document.getElementById('SaveButton').addEventListener('click', submitForm);

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
    if (isAllValid()) {
        const student = new Student();
        student.id = db.Students.length + 1;
        student.name = $('#name').val();
        student.email = $('#email').val();
        student.phone = $('#phone').val();
        student.addressTypeId = $('#addressTypeId').val();
        student.address = $('#address').val();

        db.Students.push(student);
        updateTableData();
        clearFields();
    }
}

// get a specific data
function getStudent(data) {
    const myData = getById(data);

    // set value to input fields
    $('#name').val(myData.name);
    $('#email').val(myData.email);
    $('#phone').val(myData.phone);
    $('#addressTypeId').val(myData.addressTypeId);
    $('#address').val(myData.address);
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
}

function removeStudent(data) { // remove a student
    let indexNo = db.Students.indexOf(data);
    //if (hasAnyData(indexNo)) {
        let deleteData = db.Students.splice(indexNo, 1);
        console.log(deleteData);
    //}
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
    //let nameData = $('#email').value();
    let emailData = $('#email').val();
    if (hasAnyData(emailData)) {
        let emailContain = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ((emailContain).test(emailData)) {
            $('#emailLabel').css('color', 'black');
            $('#emailLabel').html('Email');
            return true;
        } else {
            $('#emailLabel').css('color', 'red');
            $('#emailLabel').html('Email was not valid. Sorry!');
            return false;
        }
    }
    return false;
}

function isPhoneValid() {
    let mobileNum = $('#phone').val();
    let operator = mobileNum.slice(0, 3);
    if (mobileNum.length == 11) {
        getOperatorName(operator);
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

//function hasIndex(array) {
//    array
//}

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