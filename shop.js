let tg = window.Telegram.WebApp;

const orderArray = []
let buy = document.getElementById("zakaz");
let order = document.getElementById("btn");

buy.addEventListener("click", () =>{
    document.getElementById("prod").style.display = "none";
    document.getElementById("order").style.display = "flex";
    document.getElementById("zakaz-btn").style.display="none";
    document.getElementById("user_name").value = tg.initDataUnsafe.user.first_name
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

// pic.addEventListener("click", () => {
//     document.getElementById("bgvan").style.display='block';
//     document.getElementById("prod").style.display="none"
// })

// let picts = document.querySelectorAll(".prod-item-img > img");
// let imgs = document.getElementsByTagName(".prod-item-img > img");
// for (let i = 0; i < picts.length; i++) {
//     picts[i].onclick = function () {
//         let card = document.getElementById("bgvan");
//         let ob = {bgvan: `<img width="230" src="${imgs[i]}/>`};
//         document.getElementById("bgvan").style.display='block';
//         card.getElementsByTagName("img").innerHTML=ob;
//         document.getElementById("prod").style.display="none";
//         document.getElementById("zakaz-btn").style.display="none";
//     }
// }

let vanBtn = document.getElementById("van-button");

vanBtn.addEventListener("click", () =>{
    document.getElementById("bgvan").style.display = "none";
    document.getElementById("order").style.display = "flex";
    document.getElementById("user_name").value = tg.initDataUnsafe.user.first_name
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


  let prices = document.getElementById('price-card');
  let count = 0;

  [...document.querySelectorAll(".prod-item-action > button")].forEach(item => {
    item.addEventListener("click", (e) => {
        let proId = e.currentTarget.getAttribute("data");
        console.log(proId);
        orderArray.push(proId);
        console.log(orderArray);
        let count = orderArray.length;
        prices.innerText = count;
     
    });
  });

let user = document.getElementById("user_name");
let mail = document.getElementById("user_email");
let phone = document.getElementById("user_phone");
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
                document.getElementById("error").innerText = 'Error';
                console.log(item.value);
                // item.parentElement.style.border-radius = "8px";
                HasError = true;
                return;
            }
    });
    console.log(HasError)
    
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

        tg.close();
        tg.sendData(JSON.stringify(orderData))     
    }
});
