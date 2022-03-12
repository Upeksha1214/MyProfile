function Order(orderId,date,cost) {
    var orderId=Id;
    var orderDate=date;
    var orderCost=cost;
    var orderDetails=new Array();

    this.getOrderDetails=function () {
        return orderDetails;
    }
    this.setOrderId=function (id) {
        orderId=id;
    }
    this.getOrderId=function () {
        return orderId;
    }

    this.setDate=function (date) {
        orderDate=date;
    }

    this.getOrderDate=function () {
        return orderDate;
    }

    this.setOrderCost=function (cost) {
        orderCost=cost;
    }

    this.getOrderCost=function () {
        return orderCost
    }



}