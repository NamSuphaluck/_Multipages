import Counter from "../Components/Counter";
import Temperatures from "../Components/Temperatures"
import Timer from "../Components/Timer";



import "./Components.css";

function Components() {
  return (
    <div className="components-container">
      <div className="App-title">
        <span className="badge bg-dark">REACT COMPONENTS</span>
      </div>
      <div className='App-components'>
        <Counter/>
        <Temperatures aValue={10} bValue={20}/>
        <Timer/>
      </div>
       
    </div>
  );
}

export default Components;
