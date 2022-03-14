//CustomerSearch
generateOrderId();
updateDate();

function updateDate() {
    let now = new Date();
    let today = now.getDate()  + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    $("#txtOrderDate").val(today);
}

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

            var oldItemQty =cartItem[i].getItemQty();
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



//Total Amount
$("#txtCash,#txtFinalDiscount").on('keyup',function (e) {
    console.log(e.key);
    keyPress();
});

function keyPress() {
    var total=$("#txtTotal").val();
    var subTotal=$("#txtSubTotal").val();
    var cash= $("#txtCash").val();
    var discount=$("#txtFinalDiscount").val();

    $("#txtSubTotal").val(itemFinallytotal);

    if (cash!='') {
        $("#txtBalance").val('');
        $("#txtBalance").val(cash - $("#txtSubTotal").val());
        if (discount!=''){
            var itemFinallytotal= total-((discount/100)*total);
            $("#txtSubTotal").val('');
            $("#txtSubTotal").val(itemFinallytotal);
            $("#txtBalance").val('');
            $("#txtBalance").val(cash - $("#txtSubTotal").val());
        }else {
            $("#txtSubTotal").val('');
            $("#txtSubTotal").val(total);
            $("#txtBalance").val('');
            $("#txtBalance").val(cash - $("#txtSubTotal").val());

        }
    }else {
        $("#txtBalance").val('');
    }
}

//parches Order
$("#btnPurchase").click(function () {
    let res=confirm("Place order?");
    if (res) {

        if (generateResOrderId() == $("#txtOrderId").val()) {

            var orderId = $("#txtOrderId").val();
            var custId = $("#txtCustomerId").val();
            var date = $("#txtOrderDate").val();
            var cost = $("#txtSubTotal").val();
            var discount = $("#txtFinalDiscount").val();


            alert(custId);
            let order = new Order(orderId ,date, custId, discount,cost);
            let orderDetailsArray = order.getOrderDetails();
            for (var i in cartItem) {
                orderDetailsArray.push(new OrderDetails(cartItem[i].getItemCode, cartItem[i].getItemName(), cartItem[i].getItemQty, cartItem[i].getItemPrice()));
            }

            orders.push(order);

            alert("order Placed Complete");
            clearAll();
            generateOrderId();
            updateDate();

        } else {
            alert("Order Fail OrderId Incorrect");
            let res=confirm("Automatically reset order ID?");
            if (res){
                generateOrderId();

            }
        }
    }
})


$("#txtOrderId").on('keydown',function (event) {

    if (event.key=="Enter"){

        if (($("#txtOrderId").val())!=''){

            for (var ob of orders){

                if (ob.getOrderId()==($("#txtOrderId").val())){

                    $("#txtOrderId").val(ob.getOrderId());
                    $("#txtOrderDate").val(ob.getOrderDate());
                    $("#txtCustomerId").val(ob.getCustId());

                    for(var i of customerDB){
                        if (i.getId()==ob.getCustId()){

                            $("#txtCustomerName").val(i.getName());
                            $("#txtCustomerSalary").val(i.getSalary());
                            $("#txtCustomerAddress").val(i.getAddress());
                            break;
                        }
                    }

                    break;
                }

            }

        }
    }

});

//end

function clearAll() {
    $("#txtOrderId").val('');
    $("#txtOrderDate").val('');
    $("#txtCustomerId").val('');
    $("#txtCustomerName").val('');
    $("#txtCustomerSalary").val('');
    $("#txtCustomerAddress").val('');
    $("#txtICode").val('');
    $("#txtIName").val('');
    $("#txtQtyOnHand").val('');
    $("#txtOrderQty").val('');
    $("#txtTotal").val('');
    $("#txtSubTotal").val('');
    $("#txtCash").val('');
    $("#txtFinalDiscount").val('');
    $("#txtBalance").val('');
    $("#orderTable").empty();

}

//generate OrderID

function generateOrderId() {
    if (orders.length!=0) {

        let lastrecord = orders[orders.length - 1].getOrderId();
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            let generateId="O00-" + "00" + splitElement;
            $("#txtOrderId").val(generateId);

        } else if (splitElement > 99) {
            let generateId="O00-" + splitElement
            $("#txtOrderId").val(generateId);



        } else {
            let generateId="O00-001"
            $("#txtOrderId").val(generateId);

        }
    }else{
        let generateId="O00-001"
        $("#txtOrderId").val(generateId);

    }
}

//genarateResOrderId

function generateResOrderId() {
    if (orders.length!=0) {

        let lastRecord = orders[orders.length - 1].getOrderId();
        let split = lastRecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            let generateId="O00-" + "00" + splitElement;

            return generateId;
        } else if (splitElement > 99) {
            let generateId="O00-" + splitElement;

            return generateId;

        } else {

            let generateId="O00-001";
            return generateId;
        }
    }else{
        let generateId="O00-001";
        return generateId;

    }
}

$("#txtOrderId").on('keyup',function () {
    if ($("#txtOrderId").val()==''){
        generateOrderId();
    }
});

//get order
$("#txtOrderId").on('keydown',function (event) {

    if (event.key=="Enter"){

        if (($("#txtOrderId").val())!=''){

            for (var order of orders){

                if (order.getOrderId()==($("#txtOrderId").val())){

                    $("#txtOrderId").val(order.getOrderId());
                    $("#txtOrderDate").val(order.getOrderDate());
                    $("#txtCustomerId").val(order.getCustId());

                    for(var i of customerDB){
                        if (i.getId()==order.getCustId()){

                            $("#txtCustomerName").val(i.getName());
                            $("#txtCustomerSalary").val(i.getSalary());
                            $("#txtCustomerAddress").val(i.getAddress());
                            break;
                        }
                    }

                    $("#orderTable").empty();
                    for (var obj of (order.getOrderDetails())){
                        let row = `<tr><td>${obj.getItemCode()}</td><td>${obj.getItemName()}</td><td>${obj.getItemQty()}</td><td>${obj.getItemUnitPrice()}</td><td>${obj.getItemUnitPrice()*obj.getItemQty()}</td></tr>`;
                        $("#orderTable").append(row);
                    }



                    break;
                }

            }

        }



    }

});