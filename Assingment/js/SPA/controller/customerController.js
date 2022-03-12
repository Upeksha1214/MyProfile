

loadAllCustomer();
function customerAddOrUpdate(){
    var id=$("#txtCusID").val();
    var name=$("#txtCusName").val();
    var address=$("#txtCusAddress").val();
    var salary=$("#txtCusSalary").val();


    var exitesCustomer=0;

    for (var i in customerDB) {
        if (customerDB[i].getId()==id){
            customerDB[i].setName(name);
            customerDB[i].setAddress(address);
            customerDB[i].setSalary(salary);
            exitesCustomer=1;
            loadAllCustomer();

            break;

        }else {
            exitesCustomer=0;
        }
    }
    if (exitesCustomer==0){
        customerDB.push(new Customer(id,name,address,salary));

        loadAllCustomer();
    }else {

    }
}
$("#btnCustomer").click(function (){
    customerAddOrUpdate();
});

function loadAllCustomer(){
    $("#customerTable").empty();
    customerDB.forEach(function (i) {
        let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getAddress()}</td><td>${i.getSalary()}</td></tr>`;
        $("#customerTable").append(row);
    });
}

function clearAll(){
    $("#txtCusID").val('');
    $("#txtCusName").val('');
    $("#txtCusAddress").val('');
    $("#txtCusSalary").val('');
}

//Search Customer

$("#btnSearch").click(function () {
    var searchID = $("#txtSearchCusID").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#txtCusID").val(response.getId());
        $("#txtCusName").val(response.getName());
        $("#txtCusAddress").val(response.getAddress());
        $("#txtCusSalary").val(response.getSalary());
    }else{
        clearAll();
        alert("No Such a Customer");
    }
});

function searchCustomer(customerId) {
    for (var i in customerDB) {
        if (customerId==customerDB[i].getId()){
            return customerDB[i];
        }
    }
}

//SearchCustomer end


//Delete Customer
$("#btnDelete").click(function () {

    var id=$("#txtCusID").val();
    if(searchCustomer(id)==null);
    alert("No Such As A Customer");


    var id=$("#txtCusID").val();
    for (var i in customerDB) {
        if (id==customerDB[i].getId()){
            customerDB.splice(i,1);
            loadAllCustomer();
            alert("Customer Delete Complete");
            clearAll();
            break;
        }
    }
});

// validation start
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;




$("#btnCustomer").prop('disabled', true);


$("#mainDiv input").on('keydown',function (a) {
    if (a.key == "Tab") {
        a.preventDefault(); // stop execution of the button
    }
    validate(a);
    //console.log(e.key);

})

function validate(a){
    var id=$("#txtCusID").val();
    var name=$("#txtCusName").val();
    var address=$("#txtCusAddress").val();
    var salary=$("#txtCusSalary").val();

    if (cusIDRegEx.test(id)){

        $("#txtCusID").css('border', '2px solid green');
        $("#lblcusid").text("");
        $("#btnCustomer").prop('disabled', false);
        if (a.key=="Enter"){$("#txtCusName").focus()

        }

        if (cusNameRegEx.test(name)){
            $("#txtCusName").css('border', '2px solid green');
            $("#lblcusname").text("");
            $("#btnCustomer").prop('disabled', false);
            if (a.key=="Enter"){$("#txtCusAddress").focus()}

            if (cusAddressRegEx.test(address)){
                $("#txtCusAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                $("#btnCustomer").prop('disabled', false);
                if (a.key=="Enter"){$("#txtCusSalary").focus()}

                if (cusSalaryRegEx.test(salary)){
                    $("#txtCusSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    $("#btnCustomer").prop('disabled', false);
                    if (a.key=="Enter"){ customerAddOrUpdate()  }
                    $("#btnCustomer").prop('disabled', false);

                }else {
                    $("#txtCusSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    $("#btnCustomer").prop('disabled', true);
                }

            }else{
                $("#txtCusAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Name is a required field : Mimum 7");
                $("#btnCustomer").prop('disabled', true);
            }

        }else{
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            $("#btnCustomer").prop('disabled', true);
        }

    }else{
        $("#txtCusID").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        $("#btnCustomer").prop('disabled',true);
    }
}
