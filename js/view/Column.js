import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
	constructor(id, title) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Column.createRoot();
		this.elements.title = this.elements.root.querySelector(
			".kanban__column-title"
		);
		this.elements.items = this.elements.root.querySelector(
			".kanban__column-items"
		);
		this.elements.addItem = this.elements.root.querySelector(
			".kanban__add-item"
		);

		this.elements.root.dataset.id = id;
		this.elements.title.textContent = title;
		/* identifying which id is target for dragging and dropping
		yet which title is used for the structure */
		this.elements.items.appendChild(topDropZone);
		/*rendered earlier than the items so it is draggable
		it doesn't take the real space yet but leaves the id data at console*/

		this.elements.addItem.addEventListener("click", () => {
			//TODO(has to function) : add item
			const newItem = KanbanAPI.insertItems(id, "");

			this.renderItem(newItem);
		});
		KanbanAPI.getItems(id).forEach((item) => {
			this.renderItem(item);
		});
	}

	static createRoot() {
		/* the goal of this function is that returning HTML
        element as a object
        */
		const range = document.createRange();

		range.selectNode(document.body);
		//this statement allows us to return below

		return range.createContextualFragment(`
        <div class="kanban__column">
				<div class="kanban__column-title"></div>
				<div class="kanban__column-items">
					<div class="kanban__dropzone"></div>
                </div>
                <button class="kanban__add-item" type="button">+ Add</button>
			</div> 
        `).children[0]; //HTML object is virtual DOM
	}
	renderItem(data) {
		//TODO(has the responsibility of) : create the item instances
		const item = new Item(data.id, data.content);

		this.elements.items.appendChild(item.elements.root);
	}
}
