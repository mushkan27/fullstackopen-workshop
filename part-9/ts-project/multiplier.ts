type Operation = 'multiply' | 'add' | 'divide';

const multiplicator = (a: number, b: number, operation: Operation) => {
  if(operation === 'divide'){
    return a/b
  } else if (operation === 'add'){
    return a + b
  }
  return 'not valid operation'
  }
  
  console.log(multiplicator(2, 4, 'divide'));