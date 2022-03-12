//CustomerSearch
$("#btnCustomerSearch").click(function () {
    let id=$("#txtCustomerId").val();

    var customerExist=0;
    for (var i in customerDB) {
        if (id=customerDB[i].getId()){
            $("#txtCustomerName").val(customerDB[i].getName());
            $("#txtCustomerAddress").val(customerDB[i].getAddress());
            $("#txtCustomerSalary").val(customerDB[i].getSalary());
            customerExist=1;

        }
    }
    if (customerExist==0){
        alert("Such As A NO Customer ..!")
    }
});
//ItemSearch
$("#btnOrderItemSearch").click(function () {
    let id=$("#txtICode").val();

    var itemExist=0;
    for (var i in itemDB) {
        if (id=itemDB[i].getId()){
            $("#txtIName").val(itemDB[i].getName());
            $("#txtIPrice").val(itemDB[i].getPrice());
            $("#txtQtyOnHand").val(itemDB[i].getQty());
            itemExist=1;

        }
    }
    if (itemExist==0){
        alert("Such As A NO Item ..!")
    }
});


//Add to table

$("#btnAdd").click(function () {

    var itemCode=$("#txtICode").val();
    var itemName=$("#txtIName").val();
    var itemPrice=$("#txtIPrice").val();
    var itemQtyOnHand=$("#txtQtyOnHand").val();
    var itemDiscount=parseInt($("#txtDiscount").val());

    var qty=parseInt($("#txtOrderQty").val());

    var totalItemPrice=itemPrice*qty;




    var itemExsit=0;
    for (var i in cartItem) {
        if (cartItem[i].getItemCode()==itemCode){

            var oldItemQty =cartItems[i].getItemQty();
            var newItemQty=oldItemQty+qty;

            cartItem[i].setItemQty(newItemQty);
            cartItem[i].setItemPrice(itemPrice);
            cartItem[i].setTotalItemPrice(totalItemPrice);
            itemExsit=1;
            loadCart();
            break;
        }
    }
    if (itemExsit==0){
        var orderCart=new OrderCart(itemCode,itemName,qty,itemPrice,itemDiscount,totalItemPrice);
        cartItem.push(orderCart);
        alert("ok");
        loadCart();
    }


});

function loadCart(){
    var total=0;
    $("#orderTable").empty();
    cartItem.forEach(function (i) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td><td>${i.getTotalItemPrice()}</td></tr>`;
        total+=i.getTotalItemPrice();
        $("#orderTable").append(row);
    });
    $("#txtTotal").val('');
    $("#txtTotal").val(total);
    $("#txtSubTotal").val('');
    $("#txtSubTotal").val(total);
}



$("#txtCash,#txtFinalDiscount").on('keyup',function (e) {
    console.log(e.key);
    keyPress();
});

function keyPress() {
    var total=$("#txtTotal").val();
    var subTotal=$("#txtSubTotal").val();
    var cash= $("#txtCash").val();
    var discount=$("#txtFinalDiscount").val();
    var itemFinallytotal= total-((discount/100)*total);
    $("#txtSubTotal").val(itemFinallytotal);

    if (discount==''){
        $("#txtSubTotal").val(total);
    }
    if (cash==''){
        $("#txtBalance").val('');
    }else{
        var balance=cash-subTotal;
        $("#txtBalance").val(balance);
    }


}
