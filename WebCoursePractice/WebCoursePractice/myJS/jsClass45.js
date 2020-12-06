//document.write('Hello Unknown E');

var nameList = []

for (var i = 5; i > 0; --i) {
    nameList.push(i);
}
//console.log(nameList);


//document.writeln(nameList.shift());
//document.writeln(nameList.pop());
//document.writeln(nameList.slice(1, 3));
//console.log(nameList.sort());
//console.log(nameList.reverse());

//anonimous
var student = {
    id: 0,
    name: "",
    address: "",
}

// functional object
function customer() {
    this.id= 0;
    this.name= "";
    this.address= "";
}


var customers = [];



for (var i = 1; i <= 10; i++) {
    var cust = new customer();
    cust.id = i;
    cust.name = 'Abuilla' + i;
    cust.address = 'Dhaka' + i;
    customers.push(cust);
}


console.log(customers);


// functional object