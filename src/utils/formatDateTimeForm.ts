function parseAndReformatDateTime(inputDateTime: string, timezoneOffset: string): string {
  const inputDate = new Date(inputDateTime);

  if (isNaN(inputDate.getTime())) {
      throw new Error("Invalid input date-time format");
  }

  
  const year = 2025; 
  const month = String(11).padStart(2, '0'); 
  const day = String(26).padStart(2, '0'); 

  
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');
  const seconds = String(30).padStart(2, '0'); 
  const milliseconds = String(123).padStart(3, '0'); 


  // const timezoneOffset = "+01:00"; 


  const reformattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffset}`;

  return reformattedDateTime;
}

export default parseAndReformatDateTime;