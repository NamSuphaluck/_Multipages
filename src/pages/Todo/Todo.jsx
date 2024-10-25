import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchTodos } from "../../data/totos";

import "./Todo.css";
import { Form } from "react-bootstrap";

const initItemsPerPage = 10;
const initOnlyWaiting = false;

function Todo() {
  const [todosRaw, setTodosRaw] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(initOnlyWaiting);
  const [todos, setTodos] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(initItemsPerPage);
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(1);

  const itemsPerPageRef = useRef();
  const onlyWaitingRef = useRef();
  const newIdRef = useRef();
  const newTitleRef = useRef();

  useEffect(() => {
    setTodosRaw(fetchTodos());
    itemsPerPageRef.current.value = initItemsPerPage;
    onlyWaitingRef.current.checked = initOnlyWaiting;
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
    if (curPage > numPages) setCurPage(numPages);
  }, [todos, itemsPerPage, numPages, curPage]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  function deleteClick(id) {
    const updatedTodosRaw = todosRaw.filter((todo) => todo.id !== id);
    setTodosRaw(updatedTodosRaw);
  }

  function waitingClick(id) {
    const updatedTodos = todosRaw.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodosRaw(updatedTodos);
  }

  function addClick() {
    const id = parseInt(newIdRef.current.value, 10);
    const title = newTitleRef.current.value.trim();

    if (title === "") {
      alert("Title cannot be empty");
      newTitleRef.current.focus();
    } else {
      const newItem = {
        id,
        title,
        completed: false,
        userId: 1,
      };

      setTodosRaw([...todosRaw, newItem]);
      handleClose();
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  const maxId = todosRaw.reduce(
    (prev, todo) => (todo.id > prev ? todo.id : prev),
    0
  );
  newIdRef.current.value = maxId + 1;
  newTitleRef.current.value = "";
  };

  return (
    <div className="todo-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="bi bi-plus-lg"> &nbsp;Add Tasks</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control type="text" autoFocus disabled ref={newIdRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm2.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className="bi bi-x-lg">&nbsp;Cancel</span>
          </Button>
          <Button variant="primary" onClick={addClick}>
            <span className="bi bi-plus-lg">&nbsp; Add</span>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* filters */}
      <div className="todo-filters-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onChange={(e) => setOnlyWaiting(e.target.checked)}
            ref={onlyWaitingRef}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only &nbsp;
            <button className="btn btn-warning">waiting</button>
          </label>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={initItemsPerPage}
          style={{ width: "200px" }}
          onChange={handleItemsPerPageChange}
          ref={itemsPerPageRef}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      {/* table */}
      <table className="table table-striped todo-table">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "5%" }} valign="middle">
              ID
            </th>
            <th valign="middle">Title</th>
            <th style={{ textAlign: "right", width: "20%" }} valign="middle">
              Completed &nbsp;
              <button className="btn btn-primary" onClick={handleShow}>
                <span className="bi bi-plus-circle-dotted"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {todos
            .filter((todo, index) => {
              const max = curPage * itemsPerPage - 1;
              const min = (curPage - 1) * itemsPerPage;
              return index >= min && index <= max;
            })
            .map((todo) => {
              return (
                <tr key={todo.id}>
                  <td valign="middle">
                    <span
                      className="badge bg-secondary"
                      style={{ width: "2rem" }}
                    >
                      {todo.id}
                    </span>
                  </td>
                  <td style={{ textAlign: "left" }} valign="middle">
                    {todo.title}
                  </td>
                  <td style={{ textAlign: "right" }} valign="middle">
                    {todo.completed ? (
                      <span className="badge bg-success">
                        Done&nbsp;
                        <span className="bi bi-check"></span>
                      </span>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          waitingClick(todo.id);
                        }}
                      >
                        Waiting&nbsp;
                        <span className="bi bi-clock"></span>
                      </button>
                    )}
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteClick(todo.id);
                      }}
                    >
                      <span className="bi bi-trash"></span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div>
        <button
          className={
            "todo-space btn " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => setCurPage(1)}
          disabled={curPage <= 1}
        >
          First
        </button>
        <button
          className={
            "todo-space btn " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </button>
        <span className="todo-space">
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        <button
          className={
            "todo-space btn " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </button>
        <button
          className={
            "todo-space btn " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => setCurPage(numPages)}
          disabled={curPage >= numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
