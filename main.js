#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 100;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 10000;
    }
    // enroll student in a course 
    enroll_course(course) {
        this.courses.push(course);
    }
    // view the student balance
    view_balance() {
        console.log(`Available Balance for ${this.name} is : $${this.balance}`);
    }
    // Pay the fees here
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} successfully paid for ${this.name}`);
        console.log(`Your Remaining balance is ${this.balance}`);
    }
    // show the student status 
    show_Status() {
        console.log(`ID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Courses : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
    }
}
class student_system {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`${name} added successfully, Student ID : ${student.id}`);
    }
    // Enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} has successfully added in ${course} course `);
        }
    }
    // Method to show student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Invalid Student ID Please Enter Correct Id");
        }
    }
    // Method to pay student fee
    pay_student_fee(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Invalid Student ID Please Enter Correct Id");
        }
    }
    // Method to show student current status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_Status();
        }
    }
    // Method to find the student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// This main function actually runs the whole program
async function main() {
    //Priting a welcome messager for users
    console.log("\t \t \t     Welcome to My Student Management System Project  \t \t \t");
    console.log("-".repeat(100));
    let student_manager = new student_system();
    while (true) {
        let options = await inquirer.prompt([
            {
                name: "Selected_Option",
                type: "list",
                message: "Choose an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay fee",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        //Using switch Statement but you can also use if-else statement
        switch (options.Selected_Option) {
            case "Add Student":
                let input_name = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter Student Name"
                    }
                ]);
                student_manager.add_student(input_name.name);
                break;
            case "Enroll Student":
                let input_course = await inquirer.prompt([
                    {
                        name: "student_Id",
                        type: "number",
                        message: "Enter Student Id"
                    },
                    {
                        name: "Course",
                        type: "input",
                        message: "Enter Course name"
                    },
                ]);
                student_manager.enroll_student(input_course.student_Id, input_course.Course);
                break;
            case "View Student Balance":
                let input_student_balance = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter Student Id"
                    }
                ]);
                student_manager.view_student_balance(input_student_balance.Student_id);
                break;
            case "Pay fee":
                let input_Fee_Pay = await inquirer.prompt([
                    {
                        name: "Student_Id",
                        type: "number",
                        message: "Enter Student Id"
                    },
                    {
                        name: "Fee_Payed",
                        type: "number",
                        message: "Enter Amount to pay the Student fee"
                    },
                ]);
                student_manager.pay_student_fee(input_Fee_Pay.Student_Id, input_Fee_Pay.Fee_Payed);
                break;
            case "Show Student Status":
                let input_Student_status = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter Student ID"
                    }
                ]);
                student_manager.show_student_status(input_Student_status.Student_id);
                break;
            case "Exit":
                console.log(" \t                Thank you for using my Student Management System Project \t                          ");
                process.exit();
        }
    }
}
// Calling the main function
main();
