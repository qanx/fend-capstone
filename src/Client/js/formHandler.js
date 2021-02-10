// <div class="card" style="width: 18rem;">
//   <img src="..." class="card-img-top" alt="...">
//   <div class="card-body">

//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>

//   </div>
// </div>
/////////////////////
////////////////////////////// global var  
let uI = {};

///////////////////
let addB = document.querySelector("#addB");
let departueDate = document.querySelector("#departue");
let returnDate = document.querySelector("#return");
let dest = document.getElementById("city");
////////////////////////////////

// https://api.teleport.org/api/urban_areas/slug:london/images/


// https://api.teleport.org/api/urban_areas/slug:london/images/

  
async function handleSubmit(event) {
    event.preventDefault()


// fetch snippet code from : https://dev.to/thecodeholic_ke/getting-started-with-axios-and-fetch-14d6
    await fetch(`http://localhost:8085/fetchLocation?city=${dest.value}`)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          uI.country = data.countryName;
          uI.city     = data.name;
          console.log(uI.city + uI.country );
          fWeather(`http://localhost:8085/fetchForecast?lat=${data.lat}&long=${data.lng}`)
          fImg();
        
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });

  }


  async function fImg() {
    // fetch snippet code from : https://dev.to/thecodeholic_ke/getting-started-with-axios-and-fetch-14d6
  await fetch(`http://localhost:8085/fetchImg?q=${uI.city}`)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        
        uI.img = data.webformatURL;
        console.log(data.webformatURL)
        addCard()

      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

async function fWeather(url) {
  // fetch snippet code from : https://dev.to/thecodeholic_ke/getting-started-with-axios-and-fetch-14d6
  await fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        uI.temperature = data.data[0].temp;
        uI.weatherDesc = data.data[0].weather.description;
        console.log(uI.full);
       
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}



function addCard() {
  let attched = document.querySelector("#CardList");

//////////////////////////////////////////////////////////////////// DATE calc start here

//  https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript?rq=1
  
let fromNowDate = new Date();
  let TravelDate = new Date(departueDate.value);
  let returnDateCalc = new Date(returnDate.value);
  let theDifference = TravelDate.getTime() - fromNowDate.getTime();
  let days = Math.ceil(theDifference / (1000 * 3600 * 24));

  let theLength = returnDateCalc.getTime() - TravelDate.getTime();
  let theLengthInDays = Math.ceil(theLength / (1000 * 3600 * 24));

  console.log(days + " days to travel");

//////////////////////////////////////////////////////////////////// DATE calc end here


  //////////////////////////////////////////////////      DOM part start here
  ///mainDiv part
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("card");
  mainDiv.classList.add("m-3");
  mainDiv.setAttribute("style", "width: 18rem;");
  attched.appendChild(mainDiv);

  // img part
  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.setAttribute("src", uI.img);
  mainDiv.appendChild(img);

  //card Body part
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  // cardBody.setAttribute('style','width: 18rem;')
  mainDiv.appendChild(cardBody);

  //h5

  let h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.textContent = uI.country +' , ' +uI.city;
  cardBody.appendChild(h5);

  //parg
  let p = document.createElement("p");
  p.classList.add("card-text","bg-info","badge","text-wrap");

  // p.textContent = `dep ${departueDate.value} re:${returnDate.value} eee${TravelDate} toTravel${theDifference}`; //////////
  p.textContent = ` you have ${days} days left to your trip`;
  cardBody.appendChild(p);

  let p2 = document.createElement("p");
  p2.classList.add("card-text","bg-primary","badge","text-wrap");

  // p.textContent = `dep ${departueDate.value} re:${returnDate.value} eee${TravelDate} toTravel${theDifference}`; //////////
  p2.textContent = ` your trip Length is  ${theLengthInDays} days `;
  cardBody.appendChild(p2);

//temp
let p3 = document.createElement("p");
p3.classList.add("card-text","bg-secondary","text-white");
// p.textContent = `dep ${departueDate.value} re:${returnDate.value} eee${TravelDate} toTravel${theDifference}`; //////////
p3.innerHTML = ` the temp is  ${uI.temperature} &#x2103; , and its ${uI.weatherDesc} `;
cardBody.appendChild(p3);

  //but

  let removeA = document.createElement("a");
  removeA.classList.add("btn");
  removeA.classList.add("btn-danger");
  removeA.textContent = "delete";
  removeA.setAttribute("href", "#");
  cardBody.appendChild(removeA);

  removeA.addEventListener("click", () => {
    mainDiv.remove();
  });
}
///////////////////////////////////////////////////////   DOM part finsh here


// function calcDate(){

// }


export { handleSubmit }
