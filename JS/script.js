{
	let tasks = [];
	let hideDoneTasks = false;
	let allTasksDoneButtonOn = false;

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

	const toggleTaskDone = (taskIndex) => {
		tasks = tasks.map((task, index) =>
			index !== taskIndex
				? task
				: { ...task, done: !task.done }
		);
		render();
	};

	const toggleTaskDoneHide = () => {
		hideDoneTasks = !hideDoneTasks;
		render();
	};

	const allTasksDone = () => {
		tasks = tasks.map(({ content, done }) => ({ content, done: true }));
		allTasksDoneButtonOn = !allTasksDoneButtonOn;
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

	const bindtoggleDoneEvents = () => {
		const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

		toggleDoneButtons.forEach((toggleDoneButton, index) => {
			toggleDoneButton.addEventListener("click", () => {
				toggleTaskDone(index);
			});
		});
	};

	const bindtoggleDoneEventsHide = () => {
		const toggleDoneHideButton = document.querySelector(".js-toggleDoneHide");
		const toggleDoneButtonText = document.querySelector(".js-toggleDoneHideText");

		toggleDoneHideButton.addEventListener("click", toggleTaskDoneHide);
		toggleDoneButtonText.innerText = hideDoneTasks ? "Pokaż" : "Ukryj";
	};

	const bindAllTasksDone = () => {
		const allTasksDoneEvent = document.querySelector(".js-allDone");

		allTasksDoneEvent.addEventListener("click", allTasksDone);
		allTasksDoneEvent.disabled = true;
	}

	const renderTasks = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
			<li
			class="${task.done & hideDoneTasks ? "list__item--hide" : "list__item"}"
			>
			<button class="js-toggleDone button__task button__task--toggleDone"}">
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
			<botton class ="button__navigation js-toggleDoneHide">
				<span class="js-toggleDoneHideText">Ukryj</span> ukończone
			</botton>
			<botton class ="button__navigation js-allDone${allTasksDoneButtonOn ? " button__navigation--disabled" : ""}">
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
		bindtoggleDoneEvents();
		bindButtonsEvents();
		if (tasks.length !== 0) {
			bindtoggleDoneEventsHide();
			bindAllTasksDone();
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