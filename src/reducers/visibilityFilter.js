
const visibleFilter = (state="ALL", action) => {
  switch(action.type){
    case "ALL": 
    case "ACTIVE":
    case "COMPLETED":
      return action.type
    default:
      return state
  }
}

export default visibleFilter