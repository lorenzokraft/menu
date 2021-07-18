
var cartId = "hashoneCart";
//var deliveryFee = 0;
//var taxValue = 4;

var localAdapter = {

    saveCart: function (object) {


        var stringified = JSON.stringify(object);
        localStorage.setItem(cartId, stringified);
        return true;

    },
    getCart: function () {

        return JSON.parse(localStorage.getItem(cartId));

    },
    clearCart: function () {

        localStorage.removeItem(cartId);

    }

};

var ajaxAdapter = {

    saveCart: function (object) {

        var stringified = JSON.stringify(object);
        // do an ajax request here


    },
    getCart: function () {

        // do an ajax request -- recognize user by cookie / ip / session
        return JSON.parse(data);

    },
    clearCart: function () {

        //do an ajax request here

    }

};

var storage = localAdapter;

var helpers = {

    getHtml: function (id) {

        return document.getElementById(id).innerHTML;

    },
    setHtml: function (id, html) {

        document.getElementById(id).innerHTML = html;
        return true;

    },
    itemData: function (object) {

        var count = object.querySelector(".count"),
            patt = new RegExp("^[1-9]([0-9]+)?$");
        count.value = (patt.test(count.value) === true) ? parseInt(count.value) : 1;

        var item = {

            image: object.getAttribute('data-image'),
            name: object.getAttribute('data-name'),
            price:  parseFloat(object.getAttribute('data-price')),
            id: object.getAttribute('data-id'),
            count: count.value,
            total: parseFloat(object.getAttribute('data-price')) * parseInt(count.value)

        };
        return item;

    },
    updateView: function () {


//alert('xxxxxxxxxxx');
        var items = cart.getItems(),
            template = this.getHtml('cartT'),
            compiled = _.template(template, {
                items: items
            });
        this.setHtml('cartItems', compiled);

    var cartCount = 0;
    for (var i=0; i<items.length; i++) {
        cartCount += parseInt(items[i].count);
    }

    if (!$("input[name='mode']:checked").val()) {
        var modeSelected="Not Set";
    }else{
        var modeSelected =$("input[name='mode']:checked").val();
    }

    if(modeSelected === 'Delivery'){
       // alert('Delivery Fee Not Applicable');
         $( "#deliveryBlock" ).show();
         $( "#minReminder" ).show();

    }else{
         $( "#deliveryBlock" ).hide();
         $( "#minReminder" ).hide();
    }

//alert(modeSelected);

       if(cartCount == 0){
        helpers.emptyView();
       $( "#cartCalc" ).hide();
        $( "#modeBlock" ).hide();
       }else{
       $( "#cartCalc" ).show();
        $( "#modeBlock" ).show();
       }
        //this.setHtml('cartStat', cartCount);
        setTimeout(function() {
            $("#cartStat").html(cartCount);
        }, 1500);

        this.updateTotal();




jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');

jQuery('.quantity-button').click(function () {

    var $button = $(this);
    var oldValue = $button.parent().parent().find("input").val();
    oldValue = parseInt(oldValue);
    var  min = 0,
        max = 199;



   if ($button.text() == "+") {

 //  var oldValue = parseFloat(oldValue);
   var oldValue = parseInt(oldValue);

        if (oldValue >= max) {

            var newVal = oldValue;

        } else {

            var newVal = oldValue + 1;

        }

    } else {


       // var oldValue = parseFloat(oldValue);
       var oldValue = parseInt(oldValue);


        if (oldValue <= min) {

            var newVal = oldValue;

        } else {

            var newVal = oldValue - 1;

        }

    }


 $button.parent().parent().find("input").val(newVal);
 $button.parent().parent().find("input").trigger("change");

});


    },
    emptyView: function () {

        this.setHtml('cartItems', "<div class='text-center mb-10 mt-10'><img src='images/zero_cart.png'><h4>Your cart is empty</h4><p>Looks like you haven't made your choice yet</p> <button type='button' class='btn btn-warning mr-1 mb-2' data-dismiss='modal'>BACK TO MENU</button></div>");
        this.updateTotal();
         $( "#cartCalc" ).hide();
         $( "#modeBlock" ).hide();
          this.setHtml('cartStat', 0);



    },
    updateTotal: function () {
       // console.log(cart);
        var subTotal = cart.total;
         //subTotal = subTotal.toFixed(2);
        subTotal = parseFloat(subTotal);


        var orderTotal =  0;
        //orderTotal = orderTotal.toFixed(2);


        taxValue = parseFloat(taxValue);

        var taxAmount = (taxValue * subTotal) / 100;
        taxAmount = parseFloat(taxAmount);

        //alert(taxAmount);
        orderTotal = subTotal +taxAmount;
        orderTotal = parseFloat(orderTotal);

        if($("input[name='mode']:checked").val() == "Delivery") {

            if(subTotal > minOrder ) {
                this.setHtml('deliveryFee', '0');
                this.setHtml('freeDeliveryQualified', "<span class='text-green'>You Are <strong>Qualified</strong> For <strong>Free Delivery!!!</strong></span>");
               // alert('Free');
               // deliveryFee ='Free';
            }else{
                var balanceFree = minOrder - orderTotal;
                orderTotal =  orderTotal + deliveryFee;
                this.setHtml('freeDeliveryQualified', "");
            }


        }

        subTotal = subTotal.toFixed(2);
        taxAmount = taxAmount.toFixed(2);
        orderTotal = orderTotal.toFixed(2);

        this.setHtml('totalPrice', subTotal);
      deliveryFee = parseFloat(deliveryFee);
       this.setHtml('deliveryFee', deliveryFee);
        this.setHtml('taxValue', taxValue);

        this.setHtml('taxAmount', taxAmount);
        this.setHtml('orderTotal', orderTotal );

    }

};

var cart = {

    count: 0,
    total: 0,
    items: [],
    getItems: function () {

        return this.items;

    },
    setItems: function (items) {

        this.items = items;
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            this.total += _item.total;
        }

    },
    clearItems: function () {

        this.items = [];
        this.total = 0;
        storage.clearCart();
        helpers.emptyView();

    },
    clearItem: function (object) {
        // console.log(this.items);
         //console.log(cart);

         xTotal= this.items.find(x => x.id == object ).total;
         cart.total  = cart.total - xTotal;
         this.items.splice(this.items.indexOf(this.items.find(item => item.id == object)), 1);

       storage.saveCart(this.items);
       helpers.updateView();



    },
     updateCartItem: function (object, qty) {
         //console.log(this.items);
       //  console.log(cart);

       if(qty < 1) {
        cart.clearItem(object);
        // $( ".bId"+object ).show();
        // $( ".hcId"+object ).hide();



       }else{

         this.items.find(x => x.id == object ).count = qty;
        // nCount =this.items.find(x => x.id == object ).count ;
         oldTotal =this.items.find(x => x.id == object ).total;
         oldTotal =parseFloat(oldTotal);
         xPrice = this.items.find(x => x.id == object ).price;
         nTotal = xPrice * qty;
        // nTotal = nTotal.toFixed(2);

         //this.items.find(x => x.id == object ).total = nTotal;
 nTotal = parseFloat(nTotal);
        // <?php echo "alert('ssssssssss')"; ?>

          // $.get( 'test.php?id='+ object+'&count='+qty);

         // update on main frame
         // $('.cId'+object).val(qty);

         xTotal= this.items.find(x => x.id == object ).total;
         cart.total  = cart.total +( nTotal - oldTotal);
         nTotal = nTotal.toFixed(2);
          nTotal = parseFloat(nTotal);
this.items.find(x => x.id == object ).total = nTotal;


       }





      storage.saveCart(this.items);

    helpers.updateView();

        // console.log(localStorage);
        // storage.getCart();

    },
    addItem: function (item) {

        if (this.containsItem(item.id) === false) {
            var ipr=parseFloat(item.price);
          //  alert(ipr);
           var iTotal = ipr * item.count;
                iTotal =iTotal.toFixed(2);
                iTotal =parseFloat(iTotal);
            this.items.push({
                id: item.id,
                image: item.image,
                name: item.name,
                price: item.price,
                count: item.count,
                total: iTotal
            });

            storage.saveCart(this.items);


        } else {

            this.updateItem(item);

        }
        var ipr2=parseFloat(item.price);
        var ipc2=parseInt(item.count);
        var cuTot = ipr2 * ipc2;
        // cuTot =cuTot.toFixed(2);
        // cuTot =parseFloat(cuTot);
        //alert(ipr2);
        this.total += cuTot;
        this.count += item.count;
        helpers.updateView();
        //helpers.setHtml('addedProduct', item.name );
       // helpers.setHtml('addedProductBody','<strong>'+ item.name +' X '+item.count + '</strong> Added to the cart successfully');
       // $('.toast').toast('show');




    },
    containsItem: function (id) {

        if (this.items === undefined) {
            return false;
        }

        for (var i = 0; i < this.items.length; i++) {

            var _item = this.items[i];

            if (id == _item.id) {
                return true;
            }

        }
        return false;

    },
    updateItem: function (object) {
      //  console.log(object);

        for (var i = 0; i < this.items.length; i++) {

            var _item = this.items[i];

            if (object.id === _item.id) {

                var cTot = parseFloat(object.total) + parseFloat(_item.total);
                cTot =cTot.toFixed(2);
                cTot =parseFloat(cTot);
                _item.count = parseInt(object.count) + parseInt(_item.count);
                _item.total = cTot;
                this.items[i] = _item;
                storage.saveCart(this.items);

            }

        }

    }

};

document.addEventListener('DOMContentLoaded', function () {


    if (storage.getCart()) {

        cart.setItems(storage.getCart());

        helpers.updateView();



    } else {

        helpers.emptyView();

    }
    // var products = document.querySelectorAll('.product button');
    // [].forEach.call(products, function (product) {

    //     product.addEventListener('click', function (e) {

    //         var item = helpers.itemData(this.parentNode);
    //         cart.addItem(item);
    //        $( ".bId"+item.id ).hide();
    //        $( ".hcId"+item.id ).show();



    //     });





    // });




    document.querySelector('#clear').addEventListener('click', function (e) {

        cart.clearItems();

    });


});




