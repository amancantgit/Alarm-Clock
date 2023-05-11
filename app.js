window.addEventListener('DOMContentLoaded', function() {
    var setAlarmButton = document.getElementById('setAlarm');
    var audio = document.getElementById('alarmSound');
    var alarmsList = document.getElementById('alarms-list');
    var alarms = [];
  
    setAlarmButton.addEventListener('click', function() {
      var hourInput = document.getElementById('hour');
      var minuteInput = document.getElementById('minute');
  
      var alarmHour = parseInt(hourInput.value);
      var alarmMinute = parseInt(minuteInput.value);
  
      var now = new Date();
      var currentHour = now.getHours();
      var currentMinute = now.getMinutes();
  
      var timeToAlarm = (alarmHour * 60 + alarmMinute) - (currentHour * 60 + currentMinute);
  
      if (timeToAlarm < 0) {
        alert('Please set a future time for the alarm.');
        return;
      }
  
      var alarm = {
        hour: alarmHour,
        minute: alarmMinute
      };
  
      alarms.push(alarm);
      renderAlarms();
  
      setTimeout(function() {
        audio.play();
        alert('Time is up!');
        removeAlarm(alarm);
        renderAlarms();
      }, timeToAlarm * 60000);
  
      hourInput.value = '';
      minuteInput.value = '';
    });
  
    function removeAlarm(alarm) {
      var index = alarms.indexOf(alarm);
      if (index !== -1) {
        alarms.splice(index, 1);
      }
    }
  
    function renderAlarms() {
      alarmsList.innerHTML = '';
  
      for (var i = 0; i < alarms.length; i++) {
        var alarm = alarms[i];
        var alarmItem = document.createElement('div');
        alarmItem.textContent = 'Alarm: ' + alarm.hour + ':' + alarm.minute;
        alarmsList.appendChild(alarmItem);
      }
    }
  
    setInterval(function() {
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var seconds = currentTime.getSeconds();
  
      var timeString = hours + ':' + minutes + ':' + seconds;
      document.getElementById('current-time').innerText = timeString;
    }, 1000);
  });
  