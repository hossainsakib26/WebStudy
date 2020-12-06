//var el = document.getElementsByTagName("div");
//el[0].innerHTML = "This is kamrul";
//el[1].innerHTML = "This is Sakib";

//for (var i = 0; i < 6; i++) {
//    el[i].innerHTML = "this is vombol" + i;
//}

//var classEl = document.getElementsByClassName("common-div");

////var querySelector = document.querySelector('#dataDiv');
//var querySelector = document.querySelector('.common-div');
//querySelector.innerHTML = 'div modified';

function updateDataDivText() {
    var dataDivEl = document.getElementById("dataDiv");
    dataDivEl.innerText = "Change Updated";
}

function setNameOneNameTwoTextBox() {
    var el = document.getElementById("nameOne");
    var textValue = el.value;
    document.getElementById("nameTwo").value  = textValue;
}

function removeNameOneNameTwoTextBox() {
    document.getElementById("nameTwo").value = "";
}

function createStudentForm() {
     
}

function showStudentForm() {
    var elFrom = document.getElementById("studentFormDiv");
    elFrom.style.display = "block";
}

function hideStudentForm() {
    var elFrom = document.getElementById("studentFormDiv");
    elFrom.style.display = "none ";
    document.querySelector("#studentName").value = "";
}

function createEmployeeForm() {
    let empDiv = document.getElementById("employeeFormDiv");
    const formHtml = `
        <form method="post">
            <input type="text" id="employeeName" />
            <button type="submit">Save</button>
        </form>
    `;

    empDiv.innerHTML = formHtml;
    empDiv.style.display = "block";
}

var table = document.getElementById("studentTable");
var tableChild = " <tr> <td> My Table </td> </tr> ";

table.innerHTML = tableChild;