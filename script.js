async function get_data(){
    var res = await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json")
    var result = await res.json();
    console.log(result);
    for(var i =0;i<result.length;i++){
        var name = result[i].name;
        var latlng = result[i].latlng;
        var capital_data = result[i].capital
        open_data(name,...latlng,capital_data);
    }
}

async function open_data(name,lat,lon,capital_data){
    try {
    if(lat==undefined){
    throw new Error("Invalid Lat Long values") 
    }
    var open_res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fa4973b1fa1ca717811b9566c55321ec`)
    var final_res = await open_res.json();
    bootstrap(name,capital_data,lat,lon,final_res.main.temp);
    } catch (error) {
        console.log("data lost"+error.message);
    }
}


get_data();

var container  =  document.createElement("div");
container.className ="container"

var row = document.createElement("div");
row.className = "row d-flex justify-content-around"

function bootstrap(name,capital_data,lat,lon,temp){
    var col  = document.createElement("div");
    col.className = "col-md-3" 
    col.innerHTML= 
    `<div class="card m-2" style="width: 18rem;height: 14rem;background-color: aliceblue;">
    <div class="card-body d-flex align-items-center justify-content-center">
    <div>
    <p class="card-text"><b>Name : </b>: ${name}</p>
    <p class="card-text"><b>Capital : </b>: ${capital_data}</p>
    <p class="card-text"><b>[lat,lon] : </b>: ${lat,lon}</p>
    <p class="card-text"><b>Temperature : </b>: ${temp}</p>
    </div>
    </div>
    </div>`
    row.append(col);
    container.append(row);
    document.body.append(container);
}



