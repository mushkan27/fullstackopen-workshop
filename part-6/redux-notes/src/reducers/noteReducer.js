const noteReducer = (state=[], action) => {
    console.log(action)
    console.log(state)
    switch(action.type){
      case "NEW_NOTE" : {
        const newState = state.concat(action.payload)
        return newState
      }
      case 'TOGGLE_IMPORTANCE' : {
        let myNote = state.find(note => note.id === action.payload.id)
        let changedNote = {...myNote, important: !myNote.important}
        // changedNote.important = !changedNote.important
        return state.map(note => note.id === changedNote.id ? changedNote : note)
      }


      default :
      return state
    } 
  }

  export const createNote = (newNote) => {
    return {
      type: 'NEW_NOTE',
      payload: newNote}
  }

  export const toggleImportanceOf = (id) => {
    return {
      type: 'TOGGLE_IMPORTANCE',
      payload: {
        id
      }
    }
  }

  export default noteReducer