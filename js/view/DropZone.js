export default class DropZone {
	static createDropZone() {
		const range = document.createRange();

		range.selectNode(document.body);

		const dropZone = range.createContextualFragment(`
        <div class='kanban__dropzone'>
        </div> 
        `).children[0];

		//give user an impression of it is draggable with css

		dropZone.addEventListener("dragover", (e) => {
			e.preventDefault();
			dropZone.classList.add("kanban__dragzone--active");
		});

		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("kanban__dropzone--active");
		});

		return dropZone;
	}
}
