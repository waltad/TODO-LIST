{
	let tasks = [];
	let hideDoneTasks = false;

	const addNewTask = (newTaskContent) => {
		tasks = [...tasks,
		{ content: newTaskContent },
		];

		render();
	};

	const removeTask = (taskIndex) => {
		tasks = tasks.filter(task => task !== tasks[taskIndex]);
		render();
	};

	const taggleTaskDone = (taskIndex) => {
		tasks[taskIndex].done = !tasks[taskIndex].done;
		render();
	};

	const taggleTaskDoneHide = () => {
		hideDoneTasks = !hideDoneTasks;
		render();
	};

	const bindRemoveEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});
	};

	const bindTaggleDoneEvents = () => {
		const taggleDoneButtons = document.querySelectorAll(".js-taggleDone");

		taggleDoneButtons.forEach((taggleDoneButton, index) => {
			taggleDoneButton.addEventListener("click", () => {
				taggleTaskDone(index);
			});
		});
	};

	const bindTaggleDoneEventsHide = () => {
		const taggleDoneHideButton = document.querySelector(".js-taggleDoneHide");

		taggleDoneHideButton.addEventListener("click", taggleTaskDoneHide);
	};

	const renderTasks = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
			<li
			class="${task.done & hideDoneTasks ? "list__item--hide" : "list__item"}"
			>
			<button class="js-taggleDone button__task button__task--taggleDone"}">
				${task.done ? "&#x2714" : ""}
			</button>
			<p class="${task.done ? "list__item--done" : ""}">
				${task.content}
			</p>
			<button class="js-remove button__task button__task--remove">
				&#x1F5D1
			</button>
			</li>
			`;
		};

		document.querySelector(".js-tasks").innerHTML = htmlString;
	};

	const renderButtons = () => {
		let htmlStringButtons = "";
		
		if (tasks.length !== 0) {
			htmlStringButtons += `
			<botton class ="button__navigation js-taggleDoneHide">
				Ukryj ukończone
			</botton>
			<botton class ="button__navigation js-allDone">
				Ukończ wszystkie
			</botton>
			`;
		}

		document.querySelector(".js-navigationButtons").innerHTML = htmlStringButtons;
	};

	const bindButtonsEvents = () => { };

	const render = () => {
		renderTasks();
		renderButtons();

		bindRemoveEvents();
		bindTaggleDoneEvents();
		bindButtonsEvents();
		if (tasks.length !== 0) {
			bindTaggleDoneEventsHide();
		}
	};

	const clearValue = (newTask) => {
		newTask.value = "";
		newTask.focus();
	}

	const onFormSubmit = (event) => {
		event.preventDefault();

		newTask = document.querySelector(".js-newTask");
		newTaskContent = newTask.value.trim();

		if (newTaskContent !== "") {
			addNewTask(newTaskContent);
			clearValue(newTask);
			return;
		}

		newTask.focus();
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}