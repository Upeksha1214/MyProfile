function Order(orderId,date,cid,discount,cost) {
    var orderId=orderId;
    var orderDate=date;
    var custId=cid;
    var orderDiscount=discount;
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
    this.setCustId=function (cid) {
        custId=cid;
    }
    this.getCustId=function () {
        return custId;
    }

    this.setDate=function (date) {
        orderDate=date;
    }

    this.getOrderDate=function () {
        return orderDate;
    }
    this.setOrderDiscount=function (discount) {
        orderDiscount=discount;
    }

    this.getOrderDiscount=function () {
        return orderDiscount;
    }

    this.setOrderCost=function (cost) {
        orderCost=cost;
    }

    this.getOrderCost=function () {
        return orderCost
    }



}