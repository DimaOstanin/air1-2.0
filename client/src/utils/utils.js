

export const getRandomNumber =(min, max)=>{
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
  
    return randomNumber;
  }