function getDataFromServer(number){
    const http = new XMLHttpRequest();
    const url = `http://3.17.189.204:5500/api/v1/random-students/${number}`;
    http.open("GET", url);
    http.send();

    http.onreadystatechange = () => {
        const response = JSON.parse(http.responseText);
        console.log(response);
        buildStudentsTable(response.students);
    };
}
window.onload = function(){
    getDataFromServer(2);      
};


function buildStudentsTable(students) {
    const tableBody = document.getElementById("students-table-tbody")
   // tableBody.innerHTML = undefined;
    console.log(tableBody);
    if (students && students.length > 0) {
        for (let i = 0; i < students.length; i++) {
            const student = students[i];

            const row = document.createElement("tr");
            row.id = student.id;

            row.addEventListener('click', () => { });

            const numberCell = document.createElement("td");
            numberCell.innerHTML = i + 1;
            const firstNameCell = document.createElement("td");
            firstNameCell.innerHTML = students.firstName;
            const lastNameCell = document.createElement("td");
            lastNameCell.innerHTML = students.lastName;
            const ageCell = document.createElement("td");
            ageCell.innerHTML = students.age;
            const genderCell = document.createElement("td");
            genderCell.innerHTML = students.gender;
            const hasCarCell = document.createElement("td");
            const hasCar = students.hasCar ? "Yes" : "No";
            hasCarCell.innerHTML = hasCar;

            row.appendChild(numberCell);
            row.appendChild(firstNameCell);
            row.appendChild(lastNameCell);
            row.appendChild(ageCell);
            row.appendChild(genderCell);
            row.appendChild(hasCarCell);

            tableBody.appendChild(row);
        }
    }
    else {
        tableBody.innerHTML = 'No data';
    }
}

function buildStudentsProfile(student) {
    const studentProfileContainer = document.getElementById("student-profile-container");
    studentProfileContainer.innerHTML = null;

    if(student){
        const studentImg = document.createElement("img");
        studentImg.alt = "studentImage";
        studentImg.src = "student.profileImageUrl";
        studentImg.style.width = '200px';
        studentImg.style.height = '200px';
        studentImg.style.objectFit = "cover";

        const studentName = `${student.firstName} ${student.lastName}`;
        const nameContainer = document.createElement("div");
        nameContainer.innerHTML = studentName;
        studentProfileContainer.appendChild(nameContainer);
    }
    else{
        studentProfileContainer.innerHTML = "No data";
    }
}


/*document.querySelector('#search-txt').oninput = function() {
    let val = this.value.trim();
    let elasticItems = document.querySelectorAll('.search-txt td');
}*/