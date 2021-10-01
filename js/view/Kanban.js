import Column from './Column.js';

//entry point of UI
export default class Kanban {
	constructor(root) {
		this.root = root;

		Kanban.columns().forEach((column) => {
			/*first need to have another module for individual instance of
            column class */
			const columnView = new Column(column.id, column.title);
			//this is quite advanced and abstract concept for me to check
			this.root.appendChild(columnView.elements.root);
		});
	}

	static columns() {
		return [
			{
				id: 1,
				title: 'Only Planned',
			},
			{
				id: 2,
				title: 'In Progress',
			},
			{
				id: 3,
				title: 'Completed',
			},
		];
	}
}
