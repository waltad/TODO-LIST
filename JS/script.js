{
	const tasks = [];

	const addNewTask = (newTaskContent) => {
		tasks.push({
			content: newTaskContent,
		});

		render();
	};

	const removeTask = (taskIndex) => {
		tasks.splice(taskIndex, 1);
		render();
	};

	const taggleTaskDone = (taskIndex) => {
		tasks[taskIndex].done = !tasks[taskIndex].done;
		render();
	};

	const bindEvents = () => {

		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeTask(index);
			});
		});

		const taggleDoneButtons = document.querySelectorAll(".js-done");

		taggleDoneButtons.forEach((taggleDoneButton, index) => {
			taggleDoneButton.addEventListener("click", () => {
				taggleTaskDone(index);
			});
		});
	};

	const render = () => {
		let htmlString = "";

		for (const task of tasks) {
			htmlString += `
        <li
          class="list__item"
        >
          <button class="js-done button__task">
		  	${task.done ? "&#x2705" : "&#x1F7E9"}
		  </button>
          <p class="${task.done ? "list__item--done" : ""}">
		  	${task.content}
		  </p>
          <p class="list__spaces"></p>
          <button class="js-remove button__remove">
		  	&#x1F5D1
		  </button>
        </li>
        `;
		};

		document.querySelector(".js-tasks").innerHTML = htmlString;

		bindEvents();
	};

	const clearValue = (newTask) => {
		newTask.value = "";
		newTask.focus();
	}

	const onFormSubmit = (event) => {
		event.preventDefault();

		newTask = document.querySelector(".js-newTask");
		newTaskContent = newTask.value.trim();
		
		if (newTaskContent === "") {
			newTask.focus();
			return;
		}

		addNewTask(newTaskContent);

		clearValue(newTask);
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}