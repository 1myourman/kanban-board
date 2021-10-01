export default class Column {
	constructor(id, title) {
		this.elements = {};
		this.elements.root = Column.createRoot();
		this.elements.title = this.elements.root.querySelector(
			'.kanban__column-title'
		);
		this.elements.items = this.elements.root.querySelector(
			'.kanban__column-items'
		);
		this.elements.addItem =
			this.elements.root.querySelector('.kanban__add-item');
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
}
