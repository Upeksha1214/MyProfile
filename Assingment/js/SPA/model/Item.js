function Item(id,name,qty,price) {
    var id=id;
    var name=name;
    var qty=qty;
    var price=price;

    this.setId=function(ItemId){
        id=ItemId;
    }

    this.getId=function () {
        return id;
    }

    this.setName=function (ItemName) {
        name=ItemName;
    }

    this.getName=function () {
        return name;
    }

    this.setQty=function (ItemQty) {
        qty=ItemQty;
    }

    this.getQty=function () {
        return qty;
    }

    this.setPrice=function (ItemPrice) {
        price=ItemPrice;
    }

    this.getPrice=function () {
        return price;
    }
}