// // selector tất cả element
// const inpuBox = document.querySelector(".inputField input");
// const addBtn = document.querySelector(".inputField button");
// const todoList = document.querySelector(".todoList");
// const deleteAllBtn = document.querySelector(".footer button");
// const pendingTaskNum = document.querySelector(".pendingTask");

// inpuBox.onkeyup = () => {
//   let userEnterValue = inpuBox.value;
//   if (userEnterValue.trim() != 0) {
//     addBtn.classList.add("active");
//   } else {
//     addBtn.classList.remove("active");
//   }
// };
// showTask();
// addBtn.onclick = () => {
//   // khi user gõ vào bàn phím
//   let userEnterValue = inpuBox.value;
//   // láy dữ liệu từ localstorage
//   let getLocalStorage = localStorage.getItem("Newtodo");
//   if (getLocalStorage == null) {
//     console.log("here");
//     // nếu không có dữ liệu trong local
//     listArray = [];
//   } else {
//     console.log("here 2");
//     listArray = JSON.parse(getLocalStorage); //  nếu  có dữ liệu trong local
//   }

//   listArray.push(userEnterValue);
//   console.log(listArray);
//   localStorage.setItem("Newtodo", JSON.stringify(listArray));
//   showTask();
//   addBtn.classList.remove("active");
// };

// function showTask() {
//   let getLocalStorage = localStorage.getItem("Newtodo");
//   if (getLocalStorage == null) {
//     // nếu không có dữ liệu trong local
//     listArray = [];
//   } else {
//     listArray = JSON.parse(getLocalStorage); //  nếu  có dữ liệu trong local
//   }

//   pendingTaskNum.textContent = listArray.length; // tống số task = giá trị của mảng
//   console.log(listArray);
//   let newLiTask = "";
//   listArray.forEach((element, index) => {
//     newLiTask += `<li>
//     ${element}
//     <span onclick="deleteTask(${index})" class="icon"><i class="fas fa-trash"></i></span>
//   </li>`;
//   });
//   todoList.innerHTML = newLiTask;
//   inpuBox.value = "";
// }

// function deleteTask(index) {
//   let getLocalStorage = localStorage.getItem("Newtodo");
//   listArray = JSON.parse(getLocalStorage);
//   listArray.splice(index, 1); // delete item
//   localStorage.setItem("Newtodo", JSON.stringify(listArray));
//   showTask();
// }

// deleteAllBtn.onclick = () => {
//   let getLocalStorage = localStorage.getItem("Newtodo");
//   listArray = JSON.parse(getLocalStorage);
//   listArray = [];
//   localStorage.setItem("Newtodo", JSON.stringify(listArray));
//   showTask();
// };

const app = document.querySelector(".root");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            listTodo: [],

        }
    }
    onchangeTask = (text) => {

        this.setState({
            text: text.target.value
        })
        // console.log(text);
    }
    clickButton = () => {
        let itemTask = {
            id: Date.now(),
            taskTodo: this.state.text
        }

        // console.log(itemTask);
        this.setState({
            listTodo: this.state.listTodo.concat([itemTask]),
            text: "",
        })

    }
    buttonClear = () => {

        this.setState({ listTodo: [] })
    }
    deleteTask = (id) => {
        let user = [...this.state.listTodo]
        let userDelete = user.filter(item => item.id != id)
        this.setState({
            listTodo: userDelete
        })

    }

    render() {
        const { text, listTodo } = this.state

        return (
            <div className="wrapper">
                <header>Todo App</header>
                <div className="inputField">
                    <input type="text" placeholder="Add new Task" onChange={this.onchangeTask} value={text} />
                    <button disabled={!this.state.text} className={this.state.text ? 'button' : ""} onClick={this.clickButton}>Add Task</button>

                </div>
                <ul className="todoList">{this.state.listTodo.map((item, index) => {
                    return <TodoApp key={index} item={item} deleteTask={() => this.deleteTask(item.id)} />
                })}
                </ul>

                <div className="footer">
                    <p className="content">You have <span className="pendingTask">{this.state.listTodo.length}</span> pending task</p>
                    <button className={this.state.listTodo.length ? 'buttonClears' : ""} onClick={this.buttonClear}>Clear all</button>
                </div>
            </div>

        );
    }
}


class TodoApp extends React.Component {

    render() {

        return (
            < ul  >
                <li >
                    {this.props.item.taskTodo}
                    {<span onClick={this.props.deleteTask} className="icon" ><i className="fas fa-trash-alt"></i>
                    </span>}
                </li>

            </ul >
        );
    }
}

ReactDOM.render(<App />, app)