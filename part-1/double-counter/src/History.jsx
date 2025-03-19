
const History = ({history}) => {
  if(history.length > 0){
    return <div>click history: {history.join(' ')}</div>
  }
  else{
    return <p>No history yet</p>
  }
}

export default History;
