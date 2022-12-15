/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});



async function LoginRequist() {
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var data = new FormData()
    data.append('email', email)
    data.append('password', password)
    
    var object = {};
    data.forEach(function (value, key) {
        data[key] = value;
    });
    datajson = JSON.stringify(data)
    console.log(datajson)
    fetch('https://mealsv2.azurewebsites.net/api/Auth/Login', {
        method: 'POST',
        body: datajson,
        headers: { 'Content-type': 'application/json' }
    }).then(response => response.text())
        .then(res => {
            console.log('Success:', res);
            document.cookie = `token=${res}`;
            token = res;
            window.location.replace('./login web/index.html')
        })
        .catch((error) => {
            console.error('Error:', error);

        });
}




async function RegisterRequist() {
    
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var gander=document.querySelector('input[name="gander"]:checked').value;
    var age=document.getElementById('age').value;
    var nationality=document.getElementById('nationality').value;
    var weight=document.getElementById('weight').value;
    var height=document.getElementById('height').value;
    var activityLevel=document.querySelector('input[name="Activity"]:checked').value;
    var data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('password', password)
    data.append('gender', gander)
    data.append('age', age)
    data.append('nationality', nationality)
    data.append('weight', weight)
    data.append('height', height)
    data.append('activityLevel', activityLevel)
    
    var object = {};
    data.forEach(function (value, key) {
        data[key] = value;
    });
    datajson = JSON.stringify(data)
    console.log(datajson)
    fetch('https://mealsv2.azurewebsites.net/api/Auth/Register', {
        method: 'POST',
        body: datajson,
        headers: { 'Content-type': 'application/json' }
    })
        .then(res => {
            console.log('Success:', res);
            window.location.replace('Login.html')
// console.log(res.name)
            // document.getElementById('usernameAL').value=res.name;
            // name = res.name;
            // token = res;
        })
        .catch((error) => {
            console.error('Error:', error);

        });
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


async function gitUserInfo() {
    calories=1400
    fetch('https://mealsv2.azurewebsites.net/api/UserDatum/UserInfo', {
        method: 'GET',
        headers: { 'Authorization': `bearer ${getCookie("token")}` }
    }).then(response => response.json())
        .then(res => {
            console.log('Success:', res);
            document.getElementById('usernameAL').innerHTML=res.name;
            document.getElementById('usernameALtable').innerHTML=res.name;
            document.getElementById('dayCalo').innerHTML=res.recommendedCalories;
            document.getElementById('CaloToday').innerHTML=`${parseInt((calories/res.recommendedCalories)*100)}%`;
            document.getElementById('PERCENT').style=`width:${parseInt((calories/res.recommendedCalories)*100)}%`;
            document.getElementById('mealsReminting').innerHTML=5-res.userMeals.length;
            // document.getElementById('usernameAL').innerHTML=res.name;
            // document.getElementById('usernameAL').innerHTML=res.name;
            // window.location.replace('index.html')
        })
        .catch((error) => {
            console.error('Error:', error);

        });
}

function userMeals(){
    
    fetch('https://mealsv2.azurewebsites.net/api/UserMeal/GetAllUserMeals', {
        method: 'GET',
        headers: { 'Authorization': `bearer ${getCookie("token")}` }
    }).then(response => response.json())
        .then(res => {
            console.log('Success:', res);



            for (const i in res) {
                
                document.getElementById("table").innerHTML +=`<tr><td>sss</td><td>System Architect</td><td>Edinburgh</td><td>61</td><td>2011/04/25</td>
                </tr>`;
              }


        })
        .catch((error) => {
            console.error('Error:', error);

        });



    // <tr>
    //                                         <td>Tiger Nixon</td>
    //                                         <td>System Architect</td>
    //                                         <td>Edinburgh</td>
    //                                         <td>61</td>
    //                                         <td>2011/04/25</td>
    //                                     </tr>
}

function MealsGet(){

    calories=200
    valuee=document.getElementById("formControlRange").value;
    quantity=document.getElementById("quanttty").innerHTML=valuee;
    calcalc=document.getElementById("caloriesCalc").innerHTML=valuee*calories;
    
    fetch('https://mealsv2.azurewebsites.net/api/Meal/GetAll', {
        method: 'GET',
        headers: { 'Authorization': `bearer ${getCookie("token")}` }
    }).then(response => response.json())
        .then(res => {
            console.log('Success:', res);


            for (const i in res) {
                calories=res[i].calories;
                quantity=1
                document.getElementById("cardContainer").innerHTML +=
                `<!-- card -->
                <div class="card mx-2 my-3" style="width: 18rem;">
                    <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMJU_A1v_csZZVRNazYGFljpS6W2fIduK4Xw&usqp=CAU" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${res[i].name}</h5>
                      <p class="card-text">${res[i].foodCat}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        <form>
                        <div class="form-group">
                          <label for="formControlRange">quantity</label>
                          <input type="range" class="form-control-range" min="1" max="10" value=${quantity} onchange="${()=>{this.quantity=this.value}}">
                          <label class="text-center font-weight-bold" id="quanttty">${quantity}</label>
                        </div>
                      </form>
                    </li>
                      <li class="list-group-item text-center"><span class="text-primary font-weight-bold" id="caloriesCalc">${calories}</span> calories</li>
                    </ul>
                    <div class="card-body">
                
                                <a href="#" class="card-link btn btn-primary btn-lg btn-block"  onclick="${userAddMeal(res[i].name,res[i].foodCat)}">add +</a>
                
                    </div>
                  </div>
                  <!-- card -->`;
                
                realCalo=quantity*calories;
              }


        })
        .catch((error) => {
            console.error('Error:', error);

        });

        const userAddMeal=(mealname,mealCat)=>{

console.log(mealname)

console.log(mealCat)


            // document.getElementById("cardContainer").innerHTML +=
            // `            <a class="dropdown-item d-flex align-items-center" href="#">
            //                             <div class="mr-3">
            //                                 <div class="icon-circle bg-success">
            //                                     <i class="fas fa-hamburger text-white"></i>
            //                                 </div>
            //                             </div>
            //                             <div>
            //                                 <div class="small text-gray-500">general</div>
            //                                         burger                                   
            //                                     </div>
            //                         </a>`;



        }

}

function Meals(){
    

    calories=200
    valuee=document.getElementsByClassName("form-control-range")[1].value;
    quantity=document.getElementById("quanttty").innerHTML=valuee;
    calcalc=document.getElementById("caloriesCalc").innerHTML=valuee*calories;
    
                             
    }