function Employee(
  id,
  accountName,
  name,
  email,
  password,
  startDate,
  basicSalary,
  role,
  workHours
) {
  this.id = id;
  this.accountName = accountName;
  this.name = name;
  this.email = email;
  this.password = password;
  this.startDate = startDate;
  this.basicSalary = basicSalary;
  this.role = role;
  this.workHours = workHours;

  this.calcTotalSalary = function () {
    var totalSalary = 0;
    if (this.role === "Sếp") totalSalary = this.basicSalary * 3;
    if (this.role === "Trưởng Phòng") totalSalary = this.basicSalary * 2;
    if (this.role === "Nhân Viên") totalSalary = this.basicSalary;
    return totalSalary;
  };

  this.getRank = function () {
    var rank = "";
    if (this.workHours >= 192) rank = "Xuất Sắc";
    else if (this.workHours >= 176) rank = "Giỏi";
    else if (this.workHours >= 160) rank = "Khá";
    else if (this.workHours < 160) rank = "Trung Bình";
    return rank;
  };
}
