{
  const tasks = [
    {
      content: "nagrać lekcję",
      done: false,
    },
    {
      content: "zjeść pierogi",
      done: true,
    },
  ];

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
          ${task.done ? " style=\"text-decoration: line-through\"" : ""}
        >
          <button class="js-done">🟩</button>
          ${task.content}
          <button class="js-remove">🗑</button>
        </li>
        `;
		};
		
		document.querySelector(".js-tasks").innerHTML = htmlString;

		bindEvents();
  };

	const onFormSubmit = (event) => {
		event.preventDefault();

		newTaskContent = document.querySelector(".js-newTask").value.trim();
		
		if (newTaskContent === "") {
			return;
		}

		addNewTask(newTaskContent);	
	};

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}