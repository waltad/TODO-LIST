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

	const taggleTaskDone = (taskIndex) => {
		tasks = tasks.map(({content, done}, index) => {
			(index !== taskIndex) ? ({content, done}) :
			done = !done;
			return ({content, done})
		} );
		render();
	};

	const taggleTaskDoneHide = () => {
		hideDoneTasks = !hideDoneTasks;
		render();
	};

	const allTasksDone = () => {
		tasks = tasks.map(({content, done}) => ({content, done: true}));
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
		const taggleDoneButtonText = document.querySelector(".js-taggleDoneHideText");

		taggleDoneHideButton.addEventListener("click", taggleTaskDoneHide);
		taggleDoneButtonText.innerText = hideDoneTasks ? "Pokaż" : "Ukryj";
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
				<span class="js-taggleDoneHideText">Ukryj</span> ukończone
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
		bindTaggleDoneEvents();
		bindButtonsEvents();
		if (tasks.length !== 0) {
			bindTaggleDoneEventsHide();
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