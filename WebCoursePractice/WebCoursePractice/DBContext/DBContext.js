class DbContext {
    //DbSet
    constructor () {
         this.Customers = getCustomerList();
         //getCustomerList();
    }

    //dbset<>
    Customers = [];
}


// like database
function getCustomerList() {
    const customers = [];

    const cust1 = new Customer();
    const cust2 = new Customer();
    const cust3 = new Customer();
    const cust4 = new Customer();

    cust1.id = 1;
    cust1.customerName = 'Sazzad Sakib';
    cust1.email = 'sazzad@mail.com';
    cust1.contactNo = '01682225954';
    cust1.addressTypeId = '2';
    cust1.addressTypeName = 'Permanent Address';
    cust1.address = 'Chandpur, Chittagong';
    customers.push(cust1);

    cust2.id = 2;
    cust2.customerName = 'AAbrar Hasan';
    cust2.email = 'aabrarhasan@mail.com';
    cust2.contactNo = '01643335954';
    cust2.addressTypeId = '1';
    cust2.addressTypeName = 'Present Address';
    cust2.address = 'Uttara, Dhaka';
    customers.push(cust2);

    cust3.id = 3;
    cust3.customerName = 'Rakib Bari';
    cust3.email = 'rakibBari@mail.com';
    cust3.contactNo = '01782335954';
    cust3.addressTypeId = '2';
    cust3.addressTypeName = 'Permanent Address';
    cust3.address = 'Comilla, Chittagong';
    customers.push(cust3);

    cust4.id = 4;
    cust4.customerName = 'Jannat Adhora';
    cust4.email = 'adhora@mail.com';
    cust4.contactNo = '01643223954';
    cust4.addressTypeId = '1';
    cust4.addressTypeName = 'Present Address';
    cust4.address = 'Jindabajar, Sylhet';
    customers.push(cust4);


    return customers;
}

