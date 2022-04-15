const errorLabel = document.querySelector("label[for='error-msg']")
const latInp = document.querySelector("#latitude")
const lonInp = document.querySelector("#longitude")
const airQuality = document.querySelector(".air-quality")
const airQualityStat = document.querySelector(".air-quality-status")
const srchBtn = document.querySelector(".search-btn")
const componentsEle = document.querySelectorAll(".component-val")

const appId = "5c9e8500fce110a2da4d6c10df2412b8"
const link = "https://api.openweathermap.org/data/2.5/air_pollution"	// API end point
let data=[]

const getUserLocation = () => {
	// Get user Location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onPositionGathered, onPositionGatherError)
	} else {
		onPositionGatherError({ message: "Can't Access your location. Please enter your co-ordinates" })
	}
}

const onPositionGathered = (pos) => {
	let lat = pos.coords.latitude.toFixed(4), lon = pos.coords.longitude.toFixed(4)

	// Set values of Input for user to know
	latInp.value = lat
	lonInp.value = lon

	// Get Air data from weather API
	getAirQuality(lat, lon)
}

const getAirQuality = async (lat, lon) => {
	// Get data from api
	const rawData = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appId}`).catch(err => {
		onPositionGatherError({ message: "Something went wrong. Check your internet conection." })
		console.log(err)
	})
	const airData = await rawData.json()
	setValuesOfAir(airData)
	setComponentsOfAir(airData)
}

const setValuesOfAir = airData => {
	const aqi = airData.list[0].main.aqi
	let airStat = "", color = ""

	// Set Air Quality Index
	airQuality.innerText = aqi

	// Set status of air quality

	switch (aqi) {
		case 1:
			airStat = "Good"
			color = "rgb(19, 201, 28)"
			break
			case 2:
				airStat = "Fair"
				color = "rgb(15, 134, 25)"
				break
			case 3:
				airStat = "Moderate"
				color = "rgb(201, 204, 13)"
				break
			case 4:
				airStat = "Poor"
				color = "rgb(204, 83, 13)"
				break
		case 5:
			airStat = "Very Poor"
			color = "rgb(204, 13, 13)"
			break
		default:
			airStat = "Unknown"
	}

	airQualityStat.innerText = airStat
	airQualityStat.style.color = color
}

function display() {
		
		console.log(data);
		 // set the data
		 // var data = [
			 // 	{x: "Apple", value: 2235265},
			 // 	{x: "Ball", value: 38929319},
			 // 	{x: "American Indian and Alaska Native", value: 2932248},
			 // 	{x: "Asian", value: 14674252},
			 // 	{x: "Native Hawaiian and Other Pacific Islander", value: 540013},
			 // 	{x: "Some Other Race", value: 19107368},
			 // 	{x: "Two or More Races", value: 9009073}
			 // ];
			 
			 // create the chart
			 var chart = anychart.pie();
			 
			 // set the chart title
			 chart.title("Pollution Index: 2022");
			 
			 // add the data
			 chart.data(data);
			 
			 // display the chart in the container
			 chart.container('container');
			 chart.draw();
			 return;

}

const setComponentsOfAir = airData => {
	let components = {...airData.list[0].components}
	// console.log(components);
	componentsEle.forEach(ele => {
		const attr = ele.getAttribute('data-comp')
		data.push({x:attr,value:components[attr]});
		ele.innerText = components[attr] += " μg/m³"
		console.log(attr)
	})
	
	const onPositionGatherError = e => {
		errorLabel.innerText = e.message
	}
	
	
		
	}
	
	srchBtn.addEventListener("click", () => {
		data=[]
	getAirQuality(parseFloat(latInp.value).toFixed(4), parseFloat(lonInp.value).toFixed(4)).then(()=>{
		display();
	})
    })

getUserLocation()
