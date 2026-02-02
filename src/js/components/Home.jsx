import React, { useState } from "react";

const Home = () => {
	const [nuevoTodo, setNuevoTodo] = useState("");
	const [taskList, setTaskList] = useState([]);

	function oprimioTecla(e) {
		console.log("oprimioTecla");
		console.log(e.key);
		console.log(e.keyCode);

		if (e.keyCode === 13 && nuevoTodo.trim() !== "") {
			console.log("OPRIMISTE ENTER");
			console.log(`se va a agregar la tarea: ${nuevoTodo}`);

			setTaskList([...taskList, nuevoTodo]);

			setNuevoTodo("");
		}
	}

	const handleChange = (e) => {
		setNuevoTodo(e.target.value);
	};

	const deleteTask = (index) => {
		const newList = taskList.filter((_, i) => i !== index);
		setTaskList(newList);
	};

	return (
		<div style={{ padding: '40px', fontFamily: 'Arial', backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
			<center>
				<h1 style={{ color: '#333', marginBottom: '30px' }}>Task List</h1>

				<div style={{ marginBottom: '20px' }}>
					<input
						type="text"
						placeholder="¿Qué hay que hacer?"
						value={nuevoTodo}
						onChange={handleChange}
						onKeyUp={oprimioTecla}
						style={{
							padding: '10px 15px',
							width: '300px',
							borderRadius: '20px',
							border: '1px solid #ccc',
							outline: 'none',
							boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
						}}
					/>
				</div>

				<div style={{ width: '350px' }}>
					{taskList.map((task, index) => (
						<div
							key={index}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '12px',
								borderBottom: '1px solid #eee',
								background: 'white',
								marginBottom: '5px',
								borderRadius: '8px'
							}}
						>
							<span style={{ fontSize: '18px', color: '#555' }}>{task}</span>
							<button
								onClick={() => deleteTask(index)}
								style={{
									background: 'none',
									border: 'none',
									color: '#ff4d4d',
									fontSize: '20px',
									cursor: 'pointer',
									fontWeight: 'bold'
								}}
							>
							</button>
						</div>
					))}
				</div>

				{taskList.length === 0 && (
					<p style={{ color: '#aaa', marginTop: '20px' }}>No hay tareas pendientes.</p>
				)}
			</center>
		</div>
	);
};

export default Home;