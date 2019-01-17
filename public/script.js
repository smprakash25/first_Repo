function displayColleges() {
  // console.log("table loaded");
  
  fetch("http://localhost:3000/api/students", { method: "GET" })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {


      var bodyRows = "";

      for(var i=0; i<data.length; i++) {
        bodyRows += "<tr>";
        bodyRows += "<td>" + "<a href='details.html?id=" + data[i]._id + "'>" + data[i].name + "</a>" + "</td>";
        bodyRows += "<td>" + data[i].reg_no + "</td>";
        bodyRows += "<td>" + data[i].email + "</td>";
        bodyRows += "<td>" + data[i].college_id + "</td>";
        bodyRows += "</tr>";
      }

      // console.log(table_data);

      document.getElementById("table").innerHTML = bodyRows;

    });
}

function studentDetail() {
  var url = new URL(window.location.href);
    console.log(url);
  var id = url.searchParams.get("id");
   console.log(id);

  fetch("http://localhost:3000/api/students/"+id, { method : "GET" })
  .then(function(response) {
    return response.json();
  }).then(function(data) {
   console.log(data);
      var display = 
                  "<p>Name :" + data.name + "</p>" +
                  "<p>Reg No :" + data.reg_no + "</p>" +
                  "<p>Email :" + data.email + "</p>" +
                  "<p>College :" + data.college_id + "</p>" +
                  "<button class='btn btn-primary' onclick='deleteStudent(\"" +  data._id + "\")'>Delete</button>";
    
    document.getElementById('details').innerHTML = display;
    
  });
}

function deleteStudent(id) {
    console.log("id",id);
  fetch("http://localhost:3000/api/students/"+id, { method : "DELETE" })
  .then(function(response) {
    if(response.status == 200) {
      window.location = "index.html";
    }
  });
}


function userform() {
  // console.log("hello");

  var form = document.getElementById("form");
  var email = form.email.value;
  var name = form.name.value;
  var reg_no = form.reg_no.value;
  var college = form.college.value;
  const user = {
    name: name,
    email: email,
    reg_no: reg_no,
    college_id: college 
  };
  // console.log(user);

  fetch("http://localhost:3000/api/students", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(function(response) {
      if (response.status == 200) {
        window.location = "index.html";
      }
    });
}

function discolleges() {
  var form = document.getElementById("form");
  var dropdown = form.college;
  
  fetch("http://localhost:3000/api/colleges", {
    method : "GET"
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
//    console.log(data);
      var options = "";
    for(var i=0;i<data.length;i++) {
      options += "<option value=" + data[i]._id + ">" + data[i].name + "</option>";
    }

    dropdown.innerHTML = options;
//    console.log(options);
  });
    
  }

function addCollege() {
  var college = document.getElementById('college').value;
    var college_name = {
        name : college
    };
    console.log(college);
  fetch("http://localhost:3000/api/colleges", 
        { method: "POST",
         headers: {
            "Content-Type": "application/json"
        }, 
         body: JSON.stringify(college_name) })
  .then(function(response) {
    if(response.status == 200) {
      window.location = "collegelist.html";
    }
  });
}

function displayColleges() {
  fetch("http://localhost:3000/api/colleges", { method : "GET" })
  .then(function(response) {
    return response.json();
  }).then(function(data) {

      var bodyRows = "";

      for(var i=0; i<data.length; i++) {
        bodyRows += "<tr>";
        bodyRows += "<td>" + data[i].name + "</td>";
        bodyRows += "</tr>";
      }

      // console.log(table_data);
      
      document.getElementById("collegeList").innerHTML = bodyRows;
  });
}
