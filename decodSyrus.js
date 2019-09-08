// jshint esversion: 6

exports.decode = function (msg){
    let message = msg.toString();
    const numWeeks = parseInt(message.slice(6,10));
    const numDay = parseInt(message[10]);
    const dayTime = parseInt(message.slice(11,16))-(5*3600);
    const totalSeconds = (numWeeks*604800)+(numDay*86400)+dayTime;
    const totalMilis = totalSeconds*1000;
    const date = new Date(totalMilis +  new Date(1980,0,6).getTime()).toString();
    const lon = parseInt(message.slice(24,33))/100000;
    const lat = parseInt(message.slice(16,24))/100000;
    return {lat:lat, lon: lon, time: date};
};