const timeStrToSec = (timeStr) => {
  const parts = timeStr.split(':').map((number) => parseInt(number, 10));
  return (parts[0] * 3600) + (parts[1] * 60);
};

const isInTime = (workBegins, workEnds, meetBegins, duration) => {
  workBegins = timeStrToSec(workBegins);
  workEnds = timeStrToSec(workEnds);
  meetBegins = timeStrToSec(meetBegins);
  duration *= 60;

  return !(meetBegins < workBegins || duration > Math.abs(meetBegins - workEnds) || duration > Math.abs(workBegins - workEnds));
};

isInTime('08:00', '17:30', '14:00', 90); // true
isInTime('8:0', '10:0', '8:0', 120);// true
isInTime('08:00', '14:30', '14:00', 90); // false
isInTime('14:00', '17:30', '08:0', 90);// false
isInTime('8:00', '17:30', '08:00', 900); // false
