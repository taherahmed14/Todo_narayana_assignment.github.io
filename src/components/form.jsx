
export const Form = ({ setInputText, handleSubmit, setTodoTime, setTodoDate }) => {

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    const handleTime = (e) => {
        setTodoTime(e.target.value);
    }

    const handleDate = (e) => {
        setTodoDate(e.target.value);
    }

    return(
        <>
            <form>
                <input onChange={handleInputChange} type="text" placeholder="Add todo" /> <br/>
                <input type='time' className="todoTime" onChange={handleTime} />
                <input type='date' className="todoTime" onChange={handleDate}  />
                <button className="addBtn" onClick={handleSubmit} type="submit">
                    <img src="https://img.icons8.com/ios/50/000000/add--v2.png"/>
                </button>
            </form>
        </>
    )
};