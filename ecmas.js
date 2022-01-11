function BirthdaInHijri(birth) {
  const Hijiri_Months = [
    'Muharram',
    'Safar',
    "Rabi'ul Awwal",
    "Rabi'ul Akhir",
    'Jumadal Ula',
    'Jumadal Akhira',
    'Rajab',
    "Sha'ban",
    'Ramadan',
    'Shawwal',
    "Dhul Qa'ada",
    'Dhul Hijja', 
  ];
  const theFinalArry = giveTheBirthdayDateInHijiri(birth); // theFinalarry is an array contain [hijri day,hijri month,hijri year,[arabic day name, gregorian day name, number]]
  const Str = `Your Birthday in Hijri Calendar is : ${theFinalArry[3][1]} ${
    theFinalArry[0] //+ 1
  }/${theFinalArry[1] + 1}/${theFinalArry[2] + 1}A.H, In Arabic (${
    theFinalArry[3][0]
  } : ${theFinalArry[0] //+ 1
  }/${Hijiri_Months[theFinalArry[1]]}/${
    theFinalArry[2] + 1
  } A.H)`;
  return Str;
}

function showTheday(adate) {
  let datepar = new Date(adate);
  const weekDayNum = datepar.getDay();
  if (weekDayNum === 0) return ['al-Aahad', 'Sunday', 0];
  if (weekDayNum === 1) return ['al-Ithnayn', 'Monday', 1];
  if (weekDayNum === 2)
    return ['ath-Thulahthah', 'Teusday', 2];
  if (weekDayNum === 3) return ['al-ArbiAah', 'Wednsday', 2];
  if (weekDayNum === 4) return ['al-Khamies', 'Thursday', 3];
  if (weekDayNum === 5) return ['al-JumAah', 'Friday', 4];
  if (weekDayNum === 6) return ['as-Sabt', 'Saturday', 5];
  // remember when you call this showTheday function in this script to choose ()[0] for the Hijri day name and ()[1] for the Gregorian day name
}
/* today = new Date();
  console.log(today);
  todaymili = today.getTime();
  console.log(todaymili);
   */
function giveTheBirthdayDateInHijiri(birth) {
  const FromFirstHjriDayUntilnow = new Date('July,19,622'); //Here is equelivant to Friday 01/01/1 AH (Friday 01 Muharam 1 Hijri year)(al-JumAah 01 Muharam 1 Hijri year)
  //console.log(FromFirstHjriDayUntilnow)
  //   const weekDayOfFirstHijriDay = showTheday(FromFirstHjriDayUntilnow)[1];
  const birthday = new Date(birth);
  //console.log(birthday)

  function giveMeArrayOfInfo(D1, D2) {
    //this function will take two dates and return array of how many [days,hours,minutes,seconds] between the last two dates
    const array_of_info = [];
    const howManyMiliBetween = D1 - D2; //Here is equelivant to how many milliseconds passed from the first hijiri date until your day of birth
    //console.log(howMaclleugesnyMiliBetween)

    const therestwithoutdays = howManyMiliBetween % (1000 * 60 * 60 * 24); //Here is equelivant to how many milliseconds still there which equel to less than one day

    const therestWithouthours = therestwithoutdays % (1000 * 60 * 60); //Here is equelivant to how many milliseconds still there which equel to less than one hour

    const therestWithoutMinutes = therestWithouthours % (1000 * 60); //Here is equelivant to how many milliseconds still there which equel to less than one minute

    const seconds = Math.floor(therestWithoutMinutes / 1000);

    const minutes = (therestWithouthours - therestWithoutMinutes) / (1000 * 60);

    const hours = (therestwithoutdays - therestWithouthours) / (1000 * 60 * 60);

    const days =
      (howManyMiliBetween - therestwithoutdays) / (1000 * 60 * 60 * 24);
    
    array_of_info.push(days, hours, minutes, seconds);

    return array_of_info; // array_of_info is array has how many [days,hours,minutes,seconds]
  }
  const MyArrayOfInfo = giveMeArrayOfInfo(birthday, FromFirstHjriDayUntilnow); //insdie MyArrayOfInfo I have array with four items (how many days and hours and minutes and seconds between the day of birth and the first day of Hijri calender to reach to any of these items I just need to reach to its index inside this array)
  //   console.log(MyArrayOfInfo);

  const the_rest_of_the_days = MyArrayOfInfo[0] % 354.366; //here MyArrayOfInfo[0] is equelivant to the days between the day of birth and the first day of Hijri calender, please recheck the function giveMeArrayOfInfo() to see how it works
  // the_rest_of_the_days means how many days less than one full hijri year between the day of birth and the first day of Hijri calender
  // 354.366 is how many days has each Hijri years

  const how_many_days_that_years = MyArrayOfInfo[0] - the_rest_of_the_days; //how_many_days_that_years is equelivant to how many days contain the integer const years between the day of birth and the first day of Hijri calender
  const TheHijriBirthYear = how_many_days_that_years / 354.366; // now we get the year of birth in Hijiri calender

  const theRestOfDayslessThanOneMonth = the_rest_of_the_days % 29.5305;
  const the_months_in_Days =
    the_rest_of_the_days - theRestOfDayslessThanOneMonth;
  const theHijriBirthMonth = the_months_in_Days / 29.5305;
  const theHijriBirthDay = Math.ceil(theRestOfDayslessThanOneMonth);

  const weekDayOfBirthDay = showTheday(birth);

  const arrOfHijriBirth = [];
  arrOfHijriBirth.push(
    theHijriBirthDay,
    theHijriBirthMonth,
    TheHijriBirthYear,
    weekDayOfBirthDay
  );
  return arrOfHijriBirth;
}
// BirthdaInHijri('October,10,1976')
let input = '0-0-0';
document
  .getElementById('dateInput')
  .addEventListener('keyup', function (event) {
    input = this.value; // we will assign to the input virable the date value which you enter it as your birthday in Gregorian calender 
    if (event.key === 'Enter') { // this if condition check if you press enter as event after you entered the date, then will active click method to my button
      event.preventDefault(); //The Event interface's preventDefault() method tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
      document.getElementById('butToGiveBirthDate').click();
    }
  });

document.getElementById('butToGiveBirthDate').onclick = doFunction;
function doFunction() {
  document.getElementById('demo').innerHTML = BirthdaInHijri(input); // BirthdaInHijri will return string
}


/* const the_rest_of_the_days =
      (the_rest_of_the_days_t * 24 + MyArrayOfInfo[1]) / 24; // here we need to get the exact result by adding the left hours from our info array becuase we should cosiders these hourse as entering in new day, the_rest_of_the_days_t has these days without adding the last day hours as the last day hours are no calculeted as full day in the math if they were less than 24, but for the age calculation these hourse must considered
   */
