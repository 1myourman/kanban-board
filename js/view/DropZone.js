import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
	static createDropZone() {
		const range = document.createRange();

		range.selectNode(document.body);

		const dropZone = range.createContextualFragment(`
        <div class="kanban__dropzone">
        </div> 
        `).children[0];

		//give user an impression of it is draggable with css

		dropZone.addEventListener("dragover", (e) => {
			e.preventDefault();
			dropZone.classList.add("kanban__dragzone--active");
		});

		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("kanban__dropzone--active");
			//drag over and drag goes away both work in this stage
		});

		dropZone.addEventListener("drop", (e) => {
			e.preventDefault;
			dropZone.classList.remove("kanban__dropzone--active");

			const columnElement = dropZone.closest(".kanban__column");
			//defines which column to drop
			const columnId = Number(columnElement.dataset.id);
			const dropZonesInColumn = Array.from(
				columnElement.querySelectorAll(".kanban__dropzone")
			);
			const droppedIndex = dropZonesInColumn.indexOf(dropZone);
			//now it finds its exact index as expected (not dropped yet)
			const itemId = Number(e.dataTransfer.getData("text/plain"));
			//gets its own id number
			const droppedItem = document.querySelector(`[data-id="${itemId}"]`);
			//data-id class is observable in console
			const insertAfter = dropZone.parentElement.classList.contains(
				"kanban__item"
			)
				? dropZone.parentElement
				: dropZone;

			if (droppedItem.contains(dropZone)) {
				return;
			} //prevents the bug

			insertAfter.after(droppedItem);
			KanbanAPI.updateItem(itemId, {
				columnId,
				position: droppedIndex,
			});
			/* It helps the item get added with drag and drop at the 
            localstorage, but not visible in UI immediately
            without const insertAfter and after func*/
		});

		return dropZone;
	}
}
