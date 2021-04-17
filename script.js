let input = document.querySelector('.inputValue');
let button = document.querySelector('.button');
let city = document.querySelector('.city');
let desc = document.querySelector('.description');
let temp = document.querySelector('.temp');
let windSpeed = document.querySelector('.windSpeed');
let windDirection = document.querySelector('.windDirection');
let windArrow = document.querySelector('.windArrow');

function catchTheWind(lat, long) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+
    '&exclude=minutely,hourly,alerts&units=metric&appid=1b50adc6a7031a184fe219f508ceab89')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        const cityValue = input.value;
        const descValue = data['current']['weather']['0']['description'];
        const tempValue = data['current']['temp'];
        const windSpeedValue = data['current']['wind_speed'];
        const windDirectionValue = data['current']['wind_deg'];
        
        city.innerHTML = cityValue;
        desc.innerHTML = descValue;
        temp.innerHTML = tempValue+' °C';
        windSpeed.innerHTML = windSpeedValue+' m/s';
        windDirection.innerHTML = windDirectionValue+' °';
        windArrow.style.transform = 'rotate('+windDirectionValue+'deg)';
        windArrow.style.webkitTransform = 'rotate('+windDirectionValue+'deg)';
        windArrow.style.display = 'block';
    })
.catch(err => console.error('Chosen latitude and longitude is not available'))
}

button.addEventListener('click',function(){
    fetch('http://api.positionstack.com/v1/forward?access_key=4fc2d5510eb7afc37a450bea8c558b73&query='
    +input.value)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const lat = data['data']['0']['latitude'];
        const long = data['data']['0']['longitude'];
        
        console.log(lat);
        console.log(long);
        console.log(data);
        
        catchTheWind(lat, long);
    })
.catch(err => alert('Chosen city is not available'))
})


