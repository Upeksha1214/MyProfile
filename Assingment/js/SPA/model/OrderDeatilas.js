function OrderDetails(code,name,qty,unitPrice,discount,totPrice){
    var itemCode=code;
    var itemName=name;
    var itemQty=qty;
    var itemUnitPrice=unitPrice;
    var itemDiscount=discount;
    var totalPrice=totPrice;

    this.setItemCode=function (code) {
        itemCode=code;
    }
    this.getItem=function (){
        return itemCode;
    }

    this.setItemName=function (name) {
        itemName=name;
    }

    this.getItemName=function () {
        return itemName;
    }

    this.setItemQty=function (qty) {
        itemQty=qty;
    }

    this.getItemQty=function () {
        return itemQty;
    }

    this.setItemUnitPrice=function (unitPrice) {
        itemUnitPrice=unitPrice;
    }

    this.getItemUnitPrice=function () {
        return itemUnitPrice;
    }

    this.setItemDiscount=function (discount) {
        itemDiscount=discount;
    }

    this.getItemDiscount=function () {
        return itemDiscount;
    }

    this.setItemTotalPrice=function (totPrice) {
        totalPrice=totPrice;
    }

    this.getItemTotalPrice=function () {
        return totalPrice;
    }


}