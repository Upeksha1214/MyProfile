function Customer(id,name,address,salary) {
    var id=id;
    var name=name;
    var address=address;
    var salary=salary;

    this.setId=function (cusId) {
        id=cusId;
    }

    this.getId=function () {
        return id;
    }

    this.setName=function (cusName) {
        name=cusName;
    }

    this.getName=function () {
        return name;
    }

    this.setAddress=function (cusAddress) {
        address=cusAddress;
    }

    this.getAddress=function () {
        return address;
    }

    this.setSalary=function (cusSalary) {
        salary=cusSalary;
    }

    this.getSalary=function () {
        return salary;
    }
}