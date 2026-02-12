import React, { useState, useEffect } from "react";

const Home = () => {
	const [nuevoTodo, setNuevoTodo] = useState("");
	const [taskList, setTaskList] = useState([]);

	const API_URL = "https://playground.4geeks.com/todo/users/Hanna";

	const obtenerTareas = async () => {
		try {
			const response = await fetch(API_URL);
			if (response.ok) {
				const data = await response.json();
				setTaskList(data.todos);
			} else if (response.status === 404) {
				crearUsuario();
			}
		} catch (error) {
			console.error("Error obteniendo tareas:", error);
		}
	};

	const crearUsuario = async () => {
		try {
			await fetch(API_URL, { method: "POST" });
			obtenerTareas();
		} catch (error) {
			console.error("Error al crear el usuario Hanna:", error);
		}
	};

	useEffect(() => {
		obtenerTareas();
	}, []);

	const oprimioTecla = async (e) => {
		if (e.keyCode === 13 && nuevoTodo.trim() !== "") {
			try {
				const response = await fetch("https://playground.4geeks.com/todo/todos/Hanna", {
					method: "POST",
					body: JSON.stringify({
						label: nuevoTodo,
						is_done: false
					}),
					headers: { "Content-Type": "application/json" }
				});

				if (response.ok) {
					setNuevoTodo("");
					obtenerTareas();
				}
			} catch (error) {
				console.error("Error al agregar tarea:", error);
			}
		}
	};

	const deleteTask = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"
			});
			if (response.ok) {
				obtenerTareas(); 
			}
		} catch (error) {
			console.error("Error al eliminar tarea:", error);
		}
	};

	const limpiarTodo = async () => {
		try {
			await fetch(API_URL, { method: "DELETE" });
			setTaskList([]);
			crearUsuario(); 
		} catch (error) {
			console.error("Error al limpiar la lista:", error);
		}
	};

	return (
		<div style={{ padding: '40px', fontFamily: 'Arial', backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
			<center>
				<h1 style={{ color: '#333', marginBottom: '30px' }}>To Do List</h1>

				<div style={{ marginBottom: '20px' }}>
					<input
						type="text"
						placeholder="¿Qué hay que hacer hoy?"
						value={nuevoTodo}
						onChange={(e) => setNuevoTodo(e.target.value)}
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
					{taskList && taskList.map((task) => (
						<div
							key={task.id}
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
							<span style={{ fontSize: '18px', color: '#555' }}>{task.label}</span>
							<button
								onClick={() => deleteTask(task.id)}
								style={{
									background: 'none',
									border: 'none',
									color: '#ff4d4d',
									fontSize: '20px',
									cursor: 'pointer'
								}}
							>
								✕
							</button>
						</div>
					))}
				</div>

				{(!taskList || taskList.length === 0) ? (
					<p style={{ color: '#aaa', marginTop: '20px' }}>No hay tareas pendientes para Hanna.</p>
				) : (
					<button
						onClick={limpiarTodo}
						style={{
							marginTop: '30px',
							padding: '10px 20px',
							backgroundColor: '#ff4d4d',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
							fontWeight: 'bold'
						}}
					>
						Limpiar todas las tareas
					</button>
				)}
			</center>
		</div>
	);
};

export default Home;
