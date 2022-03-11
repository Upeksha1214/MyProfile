//add or update Items start
function itemAddOrUpdate(){
    var id=$("#txtItemCode").val();
    var name=$("#txtItemName").val();
    var qty=$("#txtItemQty").val();
    var price=$("#txtItemPrice").val();

    console.log(id+" "+name+"  "+qty+" "+price);


    var exitesItem =0;

    for (var i in itemDB) {
        if (itemDB[i].getId()==id){
            itemDB[i].setName(name);
            itemDB[i].setQty(qty);
            itemDB[i].setPrice(price);
            exitesItem=1;
            loadAllItems();
            break;

        }else {
            exitesItem=0;
        }
    }
    if (exitesItem==0){
        itemDB.push(new Item(id,name,qty,price));
        loadAllItems();
    }else {

    }
}

$("#btnNewItem").click(function (){
    alert("ok");
    itemAddOrUpdate();
});

//add or update items End



//search item start
$("#btnSearchItem").click(function () {

    var response = searchItem($("#txtSearchItem").val());
    if (response) {
        $("#txtItemCode").val(response.getId);
        $("#txtItemName").val(response.getName());
        $("#txtItemQty").val(response.getQty());
        $("#txtItemPrice").val(response.getPrice());
    }else{
        clearAll();
        alert("No Such a Customer");
    }
});

function clearAll() {
    $("#txtItemCode").val('');
    $("#txtItemName").val('');
    $("#txtItemQty").val('');
    $("#txtItemPrice").val('');
}


function searchItem(itemCode) {
    for(var i in itemDB){
        if (itemCode==itemDB[i].getId()){
            return itemDB[i];
        }
    }
}
//search item End


function loadAllItems(){
    $("#itemTable").empty();
    itemDB.forEach(function (i) {
        let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getQty()}</td><td>${i.getPrice()}</td></tr>`;
        $("#itemTable").append(row);
    });
}

//delete items

$("#btnDeleteItem").click(function () {

    var id=$("#txtSearchItem").val();
    if(searchItem(id)==null){
        alert("no such as Item !");
    }
    for(var i in itemDB){
        if (id==itemDB[i].getId()){
            itemDB.splice(i,1);
            loadAllItems();
            alert("Item Delete complete");

            break;
        }
    }

});

//Validation Start
// Item regular expressions
const itemCodeRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[a -z ]{3,20}$/;
const itemQtyRegEx = /^[0-9]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$("#btnNewItem").prop('disabled', true);

$("#mainItemDiv input").on('keydown',function (e) {
    if (e.key == "Tab") {
        e.preventDefault(); // stop execution of the button
    }
    validate(e);
    //console.log(e.key);

})

function validate(e){
    var id=$("#txtItemCode").val();
    var name=$("#txtItemNameName").val();
    var qty=$("#txtItemQty").val();
    var price=$("#txtItemPrice").val();

    if (itemCodeRegEx.test(id)){

        $("#txtItemCode").css('border', '2px solid green');
        $("#lblItemCode").text("");
        $("#btnNewItem").prop('disabled', false);
        if (e.key=="Enter"){$("#txtItemName").focus()

        }

        if (itemNameRegEx.test(name)){
            $("#txtItemName").css('border', '2px solid green');
            $("#lblItemName").text("");
            $("#btnNewItem").prop('disabled', false);
            if (e.key=="Enter"){$("#txtItemQty").focus()}

            if (itemQtyRegEx.test(qty)){
                $("#txtItemQty").css('border', '2px solid green');
                $("#lblItemQty").text("");
                $("#btnNewItem").prop('disabled', false);
                if (e.key=="Enter"){$("#txtItemPrice").focus()}

                if (itemPriceRegEx.test(price)){
                    $("#txtItemPrice").css('border', '2px solid green');
                    $("#lblItemPrice").text("");
                    $("#btnNewItem").prop('disabled', false);
                    if (e.key=="Enter"){ itemAddOrUpdate()  }
                    $("#btnNewItem").prop('disabled', false);

                }else {
                    $("#txtItemPrice").css('border', '2px solid red');
                    $("#lblItemPrice").text("Item Price is a required field : Pattern 100.00 or 100");
                    $("#btnNewItem").prop('disabled', true);
                }

            }else{
                $("#txtItemQty").css('border', '2px solid red');
                $("#lblItemQty").text("Item QTY is a required field : Minimum 2");
                $("#btnNewItem").prop('disabled', true);
            }

        }else{
            $("#txtItemName").css('border', '2px solid red');
            $("#lblItemName").text("Item Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            $("#btnNewItem").prop('disabled', true);
        }

    }else{
        $("#txtItemCode").css('border', '2px solid red');
        $("#lblItemCode").text("Item ID is a required field : Pattern I00-000");
        $("#btnNewItem").prop('disabled',true);
    }
}