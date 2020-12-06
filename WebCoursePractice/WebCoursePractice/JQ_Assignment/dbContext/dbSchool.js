class dbSchool {

    constructor() {
        this.Students = getStudentList();
    }

    Students = [];
}

function getStudentList() {
    //declare array
    const students = [];

    // declare object of Student
    const std1 = new Student();
    const std2 = new Student();
    const std3 = new Student();
    const std4 = new Student();

    // assign values

    std1.id = 1;
    std1.name = 'Sazzad Sakib';
    std1.email = 'sazzad@mail.com';
    std1.phone = '01683332223';
    std1.addressTypeId = '1';
    std1.address = 'Khilgaon, Bangladesh';
    students.push(std1);

    std2.id = 2;
    std2.name = 'Hasan Read';
    std2.email = 'read@mail.com';
    std2.phone = '01682342323';
    std2.addressTypeId = '2';
    std2.address = 'Uttara, Dhaka';
    students.push(std2);

    std3.id = 3;
    std3.name = 'Azmir Hasan';
    std3.email = 'azmir@mail.com';
    std3.phone = '01712332223';
    std3.addressTypeId = '1';
    std3.address = 'Chandpur, Chittagong';
    students.push(std3);

    std4.id = 4;
    std4.name = 'Joynal Hasan';
    std4.email = 'hasan@mail.com';
    std4.phone = '0112332223';
    std4.addressTypeId = '2';
    std4.address = 'Khilgaon, Dhaka';
    students.push(std4);

    return students;

}