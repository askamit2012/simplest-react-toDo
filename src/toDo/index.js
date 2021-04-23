import React, { Component } from 'react'
import './style.css'

export class Index extends Component {
    constructor(){
        super()
        this.state = {
            taskVal : '',
            taskList: [],
            newTaskVal: ''
        }

        this.inputRef = React.createRef()
        this.newInputRef = React.createRef()
    }

    componentDidMount = () => {
        this.inputRef.current.focus()
    }

    
    
    handletaskInput = (e) => {
        this.setState({
            taskVal: e.target.value
        })
    }

    handleTaskSubmit = (e) => {
        e.preventDefault()

        if(this.state.taskVal === ''){
            alert('Kindly Enter any Task')
        } else {
            let newTask = {
                task: this.state.taskVal,
                isChecked: false,
                isEditable: false
            }
            const myList = [...this.state.taskList]
            myList.push(newTask)
            this.setState({
                taskList: myList
            })
            this.setState({
                taskVal: ''
            }) 
        }
           
    }

    handleCB = index => {
        let myList = [...this.state.taskList]
        myList[index].isChecked = !myList[index].isChecked
        this.setState({
            taskList: myList
        })
        console.log('handleCB', index)
    }

    handleDelete = (index) => {
        let myList = [...this.state.taskList]
        myList.splice(index, 1)
        this.setState({
            taskList: myList
        })
    }

    handleEdit = index => {
        const myList = [...this.state.taskList]
        myList[index].isEditable = !myList[index].isEditable
        this.setState({
            taskList: myList
        })
    }

    handlenewTaskInput = (e) => {
        this.setState({
            newTaskVal: e.target.value
        })
    }

    handleNewTaskSubmit = (index) => {
        if(this.state.newTaskVal === ''){
            alert('Kindly Enter a Task To save')
        } else {
            const newTask = {
                task: this.state.newTaskVal,
                isChecked: false,
                isEditable: false
    
            }
            const myList = this.state.taskList
            myList.splice(index, 1, newTask)
            this.setState({
                taskList: myList
            })
            this.setState({newTaskVal: ''})
        }
        
    }
    
    render() {
        const {taskVal, taskList} = this.state
        return (
            <div className="ToDo">
               <h2>HeY!</h2> 
               <form onSubmit={e => this.handleTaskSubmit(e)} >
                    <input onChange = { e => this.handletaskInput(e)} value={taskVal} ref={this.inputRef} />
                    <button>Add Task</button>
               </form>
               {
                   taskList.map((task,index) => 
                    task.isEditable 
                    ? 
                    <div>
                        <input onChange={e => this.handlenewTaskInput(e)} placeholder={task.task} ref={this.newInputRef} />
                        <button onClick={() => this.handleNewTaskSubmit(index)}>Modify</button>
                        <button onClick= {() => this.handleDelete(index)}>DEL</button>
                    </div> 
                    :
                    task.isChecked
                    ?
                        <div style={{textDecoration: 'line-through'}}>
                        <input type='checkbox' onChange={() => this.handleCB(index)}/>
                        <span><mark>{task.task}</mark></span>
                        <button onClick= {() => this.handleEdit(index)}>Edit</button>
                        <button onClick={() => this.handleDelete(index)}>DEL</button>
                        </div>
                    :
                    <div>
                       <input type='checkbox' onChange={() => this.handleCB(index)}/>
                       <span><mark>{task.task}</mark></span>
                       <button onClick= {() => this.handleEdit(index)}>Edit</button>
                       <button onClick={() => this.handleDelete(index)}>DEL</button>
                    </div>
                )
               }
            </div>
        )
    }
}

export default Index
