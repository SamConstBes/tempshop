
const orderArray = [];
let buy = document.getElementById("zakaz");
let order = document.getElementById("btn");

buy.addEventListener("click", (e) =>{
    document.getElementById("prod").style.display = "none";
    document.getElementById("order").style.display = "flex";
    document.getElementById("zakaz-btn").style.display="none";
  //document.getElementById("user_name").value = tg.initDataUnsafe.user.first_name
});

// order.addEventListener("click", () =>{
//     tg.close();
// });

let pic = document.getElementById("van");
let logo = document.getElementById("logo");
logo.addEventListener("click", () =>{
    document.getElementById("bgvan").style.display='none';
    document.getElementById("prod").style.display="grid";
    document.getElementById("order").style.display="none";
    document.getElementById("zakaz-btn").style.display="flex";
});

let vanBtn = document.getElementById("van-button");

vanBtn.addEventListener("click", () =>{
    document.getElementById("bgvan").style.display = "none";
    document.getElementById("order").style.display = "flex";
    //document.getElementById("user_name").value = tg.initDataUnsafe.user.first_name
});

[...document.querySelectorAll(".prod-item-img > img")].forEach(item => {
    item.addEventListener("click", (e) => {
      card = (e.currentTarget.getAttribute("src"));
      alt = e.currentTarget.getAttribute("alt");
      document.getElementById("bgvan").style.display='block';
      let img = document.getElementById('card'); // Replace with your image element ID
      let desc = document.getElementById("desc");  
      img.src = card;
      desc.textContent = alt; 
      document.getElementById("prod").style.display="none";
      document.getElementById("zakaz-btn").style.display="none";
    });
  });


  let footerPrice = document.getElementById("footer-price-card");
  let count = 0;
  let cardWish = document.getElementById("prod-item-wish");
  footerPrice.innerHTML = count;

  [...document.querySelectorAll(".prod-item-action > button")].forEach(item => {
    item.addEventListener("click", (e) => {
        let proId = e.currentTarget.getAttribute("data");
        orderArray.push(proId);
        console.log(orderArray);
        let count = orderArray.length;
        footerPrice.innerHTML = count;
    });
  });

 [...document.querySelectorAll(".prod-item-wish")].forEach(item => {
    item.addEventListener("click", (e) =>{
        let cardWish = e.currentTarget;
        let style = window.getComputedStyle(cardWish);
        let counter = style.getPropertyValue('filter');
        if (counter.length > 15){
            cardWish.style.filter="brightness(1)";
        }else{cardWish.style.filter="brightness(0) invert(1)";}
        
    });
 });

let user = document.getElementById("user_name");
let mail = document.getElementById("user_email");
let phone = document.getElementById("user_phone");
// let tg = window.Telegram.WebApp;
order.addEventListener("click", () =>{
    let HasError = false;
    document.getElementById("error").innerText = '';
    [user, mail, phone].forEach(item =>{
        if(!item.value) {
            item.style.border = '2px solid red';
            // item.parentElement.style.border-radius = "8px";
            HasError = true;
        } else{item.style.border = '';}
    });
    [user, mail, phone].forEach(item =>{
            if(item.value.length < 5) {
                // document.getElementById("error").innerText = 'Error';
                // console.log(item.value);
                // item.parentElement.style.border-radius = "8px";
                HasError = true;
                return;
            }
    });
    console.log(HasError)
    const tg = window.Telegram.WebApp;
        let orderData = {
            name: user.value,
            mail: mail.value,
            phone: phone.value,
            order: orderArray
        }
        // alert('Спасибо за заказ')
        // console.log(orderData)
        if (!HasError) {
            [user, mail, phone].forEach(item =>{
                item.value = '';
            });
        tg.sendData(JSON.stringify(orderData))    
        tg.close();
    }
});
