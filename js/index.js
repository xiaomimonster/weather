/*
1.获取默认城市的天气信息
2.获取所有城市的信息
3.点击每个城市可以获取当前城市的天气信息
4.在搜索框输入要搜索的城市
5.
*/
$(function() {
    // 1.获取当前城市的天气信息
    let weather;
    $.ajax({
        type: "get",
        url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
        dataType: "jsonp",
        success: function (obj) {
            // console.log(obj);
            weather = obj.data;
            updata(weather);

        }
    })

    function updata(weather) {
        $(".city").html(weather.city);
        $(".box h3").html(weather.weather.quality_level);
        $(".temperature").html(weather.weather.current_temperature + "°");
        $(".condition").html(weather.weather.day_condition);
        $(".humidity .right").html(weather.weather.aqi + "%");

        $(".today #dat_high_temperature").html(weather.weather.dat_high_temperature);
        $(".today #dat_low_temperature").html(weather.weather.dat_low_temperature + "°");
        $(".today .bottom-text").html(weather.weather.day_condition);
        $(".today .img").css({"background-image": "url(img/" + weather.weather.dat_weather_icon_id + ".png)"});

        $(".tomorrow #tomorrow_high_temperature").html(weather.weather.tomorrow_high_temperature);
        $(".tomorrow #tomorrow_low_temperature").html(weather.weather.tomorrow_low_temperature + "°");
        $(".tomorrow .bottom-text").html(weather.weather.tomorrow_condition);
        $(".tomorrow .tomorrow-img").css({"background-image": "url(img/" + weather.weather.tomorrow_weather_icon_id + ".png)"});

        let hour = weather.weather.hourly_forecast;
        // console.log(hour);
        let str = "";
        hour.forEach(function (v, i) {
            // console.log(v,i);
            str = str + `
                    <div class="now">
                        <h2 class="now-time">${v.hour}:00</h2>
                        <div class="now-icon" style="background-image:url(img/${v.weather_icon_id}.png)"></div>
                        <h2 class="now-temp">${v.temperature}°</h2>
                    </div>
                    `
        });
        $(".wrap").html(str);
    }
    let city;
    $.ajax({
        type: "get",
        url: "https://www.toutiao.com/stream/widget/local_weather/city/",
        dataType: "jsonp",
        success: function (obj) {
            city = obj.data;
            updataCity(obj.data);
        }
    })
    $(".city").click(function () {
        $(".loaction").css({"display": "block"});
        $(".information").css({"display": "none"});
        $(".notice").css({"display": "none"});
        $(".recent").css({"display": "none"});
    })

    $(".section-right").click(function () {
        $(".loaction").css({"display": "none"});
        $(".information").css({"display": "block"});
        $(".notice").css({"display": "block"});
        $(".recent").css({"display": "block"});
        let con = $(this).html();
    })

    function updataCity(city) {
        for (let i in city) {
            let str = `<h1 class="title1">${i}</h1>`;
            $(".city-box").append(str);
            $(".City").addClass(".city-box");
            for (let j in city[i]) {
                let str1 = `<div class="City-box">${j}</div>`;
                $(".city-box").append(str1);
            }
        }
    }
    function AJAX(str){
        $.ajax({
            type:"get",
            url:url1,
            dataType:"jsonp",
            success:function(obj){
                str=obj.data;

                updata(str);
            }
        })
    }
    var weaL=document.createElement("div")
    window.onload=function(){
        $(".City-box").click(function(){
            let con=$(this).html();
            $(".loaction").css({"display": "none"});
            $(".information").css({"display": "block"});
            $(".notice").css({"display": "block"});
            $(".recent").css({"display": "block"});
            let url2=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${con}`;
            url1=url2;
            AJAX();
        })
        $("input").on("focus",function(){
            $(".section-right").html("搜索");
        })
        let button=document.querySelector(".section-right");
        // console.log(button);
        button.onclick=function(){
            let text=button.innerText;
            if(text=="取消"){
                $(".loaction").css({"display":"none"});
            }
            else{
                let str1=$("input").val();
                // console.log(str1)
                for(let i in city){
                    for(let j in city[i]){
                        if(str1==j){
                            let url3=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str1}`;
                            url1=url3;
                            AJAX(str1);
                            return;
                        }
                    }
                }
                alert("没有该城市");
            }
        }
    }
})