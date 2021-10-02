import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item {
	constructor(id, content) {
		const bottomDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(
			".kanban__item-input"
		);

		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
		//as a reference for current content and when it is changed
		this.content = content;

		//Let's give the user ability to update the item
		const onBlur = () => {
			const newContent = this.elements.input.textContent.trim();

			if (newContent == this.content) {
				return;
			}

			this.content = newContent;
			KanbanAPI.updateItem(id, {
				content: this.content,
			});
		};
		this.elements.input.addEventListener("blur", onBlur);
		this.elements.root.addEventListener("dblclick", () => {
			const check = confirm("Do you want to delete the item?");

			if (check) {
				KanbanAPI.deleteItem(id);

				this.elements.input.removeEventListener("blur", onBlur);
				this.elements.root.parentElement.removeChild(this.elements.root);
			}
		});
		this.elements.root.addEventListener("dragstart", (e) => {
			/* How to interact between two HTML elements
			when drag and drop events happen*/
			e.dataTransfer.setData("text/plain", id);
			/* with only this function, it is draggable but
			combined with other item with an id only
			preventDefault */
		});

		this.elements.input.addEventListener("drop", (e) => {
			e.preventDefault();
		});
	}

	static createRoot() {
		//wanna make the container for the each item
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
        <div class='kanban__item' draggable="true">
            <div class='kanban__item-input' contenteditable></div>
        </div> 
        `).children[0]; //draggable attribute!
	}
}
