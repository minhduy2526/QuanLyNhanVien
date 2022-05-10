var employeeList = [];
var id = 1;

var createEmployee = function () {
  if (!validate()) return;
  console.log(123);
  var form = document.getElementById("my-form");
  var accountName = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var startDate = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var role = document.getElementById("chucvu").value;
  var workHours = document.getElementById("gioLam").value;

  var newEmployee = new Employee(
    id,
    accountName,
    name,
    email,
    password,
    startDate,
    basicSalary,
    role,
    workHours
  );

  employeeList.push(newEmployee);
  //   console.log(employeeList);
  renderEmployees();
  saveData();
  form.reset();
  id++;
  console.log(newEmployee);
};

var renderEmployees = function (data) {
  data = data || employeeList;
  var dataHTML = "";
  for (var i = 0; i < data.length; i++) {
    dataHTML += `
    <tr>
        <td>${data[i].accountName}</td>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        <td>${data[i].startDate}</td>
        <td>${data[i].role}</td>
        <td>${data[i].calcTotalSalary()}</td>
        <td>${data[i].getRank()}</td>
        <td>
        <button class = "btn btn-danger" onclick="deleteEmployee('${
          data[i].id
        }')">Xóa</button>
        <button class = "btn btn-info" data-toggle="modal"
        data-target="#myModal" onclick="getEmployee('${
          data[i].id
        }')">Cập Nhật</button>
    </td>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = dataHTML;
};

var saveData = function () {
  var employeeListJSON = JSON.stringify(employeeList);
  localStorage.setItem("list", employeeListJSON);
};

var getData = function () {
  var getEmployeeListJSON = localStorage.getItem("list");
  if (getEmployeeListJSON) {
    employeeList = mapData(JSON.parse(getEmployeeListJSON));
    renderEmployees();
  }
};

var mapData = function (dataFromLocal) {
  var data = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var currentEmployee = dataFromLocal[i];
    var mappedEmployee = new Employee(
      currentEmployee.id,
      currentEmployee.accountName,
      currentEmployee.name,
      currentEmployee.email,
      currentEmployee.password,
      currentEmployee.startDate,
      currentEmployee.basicSalary,
      currentEmployee.role,
      currentEmployee.workHours
    );
    data.push(mappedEmployee);
  }
  return data;
};
getData();

var findEmployeeByID = function (id) {
  id *= 1;
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].id === id) {
      return i;
    }
  }
  return -1;
};

var deleteEmployee = function (id) {
  var index = findEmployeeByID(id);
  if (index === -1) {
    alert("The Employee Does Not Existed!");
    return;
  }
  employeeList.splice(index, 1);
  renderEmployees();
  saveData();
};

var getEmployee = function (id) {
  var index = findEmployeeByID(id);
  if (index === -1) {
    alert("The Employee Does Not Existed!");
    return;
  }
  var foundEmployee = employeeList[index];
  document.getElementById("tknv").value = foundEmployee.accountName;
  document.getElementById("name").value = foundEmployee.name;
  document.getElementById("email").value = foundEmployee.email;
  document.getElementById("password").value = foundEmployee.password;
  document.getElementById("datepicker").value = foundEmployee.startDate;
  document.getElementById("luongCB").value = foundEmployee.basicSalary;
  document.getElementById("chucvu").value = foundEmployee.role;
  document.getElementById("gioLam").value = foundEmployee.workHours;
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "inline-block";
  document.getElementById("header-title").innerHTML = "Update Employee";
};

var updateEmployee = function () {
  var accountName = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var startDate = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var role = document.getElementById("chucvu").value;
  var workHours = document.getElementById("gioLam").value;

  var index = findEmployeeByID(id);
  if (index === -1) {
    alert("The Employee Does Not Existed!");
    return;
  }
  var foundEmployee = employeeList[index];
  foundEmployee.accountName = accountName;
  foundEmployee.name = name;
  foundEmployee.email = email;
  foundEmployee.password = password;
  foundEmployee.startDate = startDate;
  foundEmployee.basicSalary = basicSalary;
  foundEmployee.role = role;
  foundEmployee.workHours = workHours;

  var updatedEmployee = new Employee(
    accountName,
    name,
    email,
    password,
    startDate,
    basicSalary,
    role,
    workHours
  );

  renderEmployees();
  saveData();
  document.getElementById("btnDong").click();
  document.getElementById("btnThemNV").style.display = "block";
};

var searchEmployee = function () {
  var keyword = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();
  var res = [];
  for (var i = 0; i < employeeList.length; i++) {
    var rank = employeeList[i].getRank().toLowerCase();
    console.log(typeof employeeList[i].id);
    if (employeeList[i].id === keyword || rank.includes(keyword)) {
      res.push(employeeList[i]);
    }
  }
  renderEmployees(res);
};

var validate = function () {
  var accountName = document.getElementById("tknv").value;
  var isValid = true;

  isValid &=
    require(accountName, "tbTKNV") && checkLength(accountName, "tbTKNV", 4, 6);
};

var require = function (val, spanID, message) {
  if (!val) {
    document.getElementById(spanID).style.display = "inline-block";
    document.getElementById(spanID).innerHTML =
      message || "* Please input the value!";
    return false;
  }
  document.getElementById(spanID).innerHTML = "";
  return true;
};

var checkLength = function (val, spanID, min, max) {
  if (val.length < min || val.length > max) {
    document.getElementById(spanID).style.display = "inline-block";
    document.getElementById(spanID).innerHTML = `The length must be from ${min} to ${max} character!`;
    return false;
  }
  document.getElementById(spanID).innerHTML = "";
  return true;
};

var changeTitle = function () {
  document.getElementById("header-title").innerHTML = "Register";
  document.getElementById("btnThemNV").style.display = "inline-block";
  document.getElementById("btnCapNhat").style.display = "none";
};