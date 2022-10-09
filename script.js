function getDataFromServer(number) {
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
window.onload = function () {
  getDataFromServer(10);
};

function buildStudentsTable(students) {
  const tableBody = document.getElementById("students-table-tbody");
  tableBody.innerHTML = null;
  console.log(tableBody);
  
  if (students && students.length > 0) {
    for (let i = 0; i < students.length; i++) {
      const student = students[i];

      const row = document.createElement("tr");
      row.id = student.id;

      row.addEventListener("click", () => {
        numberCell.classList = ['search-txt'];
        buildStudentsProfile(student);
      });
    

      const numberCell = document.createElement("td");
      numberCell.innerHTML = i + 1;
      const firstNameCell = document.createElement("td");
      firstNameCell.innerHTML = student.firstName;
      firstNameCell.classList = ['td']
      const lastNameCell = document.createElement("td");
      lastNameCell.innerHTML = student.lastName;
      const ageCell = document.createElement("td"); 
      ageCell.innerHTML = student.age;
      const genderCell = document.createElement("td");
      genderCell.innerHTML = student.gender;
      const hasCarCell = document.createElement("td");
      const hasCar = student.hasCar ? "Yes" : "No";
      hasCarCell.innerHTML = hasCar;

      row.appendChild(numberCell);
      row.appendChild(firstNameCell);
      row.appendChild(lastNameCell);
      row.appendChild(ageCell);
      row.appendChild(genderCell);
      row.appendChild(hasCarCell);

      tableBody.appendChild(row);
    }
  } else {
    tableBody.innerHTML = "No data";
  }
}

function buildStudentsProfile(student) {
  const studentProfileContainer = document.getElementById(
    "student-profile-container"
  );
  studentProfileContainer.innerHTML = null;

  if (student) {
    const studentImg = document.createElement("img");
    studentImg.alt = "studentImage";
    studentImg.src = student.profileImageUrl;
    studentImg.style.width = "200px";
    studentImg.style.height = "200px";
    studentImg.style.objectFit = "cover";

    const studentName = `<b>STUDENT INFORMATION:</b> <br> First name: ${student.firstName} <br> Last name: ${student.lastName} <br> Age: ${student.age} <br> Gender: ${student.gender} <br> Has car: ${student.hasCar}`;
    const nameContainer = document.createElement("div");
    nameContainer.classList = ['divdiv'];
    nameContainer.innerHTML = studentName;
    studentProfileContainer.appendChild(nameContainer);
    studentProfileContainer.appendChild(studentImg);
  } else {
    studentProfileContainer.innerHTML = "No data";
  }

}

// ----------------------------------search

document.querySelector('#elastic').oninput = function () {
  let val = this.value.trim();
  let elasticItems = document.querySelectorAll('.elastic td');
          if (val != '') {
              elasticItems.forEach(function(elem) {
                  if (elem.innerText.search(val) == - 1) {
                  let remove = elem.classList.add("hide");
                  elem.innerHTML = elem.innerText;
              }
          else {
                   elem.classList.remove("hide");
                   let str = elem.innerText;
                   elem.innerHTML = insertMark (str,elem.innerText.search(val),val.length);
              }
      });                 
  } 
  else {
      elasticItems.forEach (function (elem) {
      let remove = elem.classList.remove("hide");
      elem.innerHTML = elem.innerText;
      });
  }  
}

function insertMark(string,pos,len) {
return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len);
}


