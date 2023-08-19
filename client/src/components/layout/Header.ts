import getIcon from '../icons';

interface HeaderListArgs {
	name: string;
}

interface HeaderInstanceArgs {
	scrollableEl: HTMLElement;
}

export default class Header {
	#container: HTMLDivElement;
	#logoSrc: string;
	#logoObject: HTMLObjectElement;
	#logoWrapper: HTMLDivElement;
	#sectionList: HTMLUListElement;

	constructor({ scrollableEl }: HeaderInstanceArgs) {
		this.#container = document.createElement('div');
		this.#container.id = 'header';
		this.#logoWrapper = document.createElement('div');
		this.#logoWrapper.id = 'logo-wrapper';

		this.#logoSrc = getIcon({ name: 'Logo' });

		this.#logoObject = document.createElement('object');
		this.#logoObject.setAttribute('type', 'image/svg+xml');
		this.#logoObject.setAttribute('data', this.#logoSrc);
		this.#logoObject.setAttribute('width', '50');
		this.#logoObject.setAttribute('height', '50');


		// Add classes to apply styles
		this.#logoObject.classList.add(
			'select-none',
			'pointer-events-auto',
		)
		this.#container.classList.add(
			'flex',
			'fixed',
			'justify-center',
			'md:justify-between',
			'lg:justify-between',
			'top-0',
			'px-6',
			'md:px-8',
			'py-4',
			'w-full',
			'z-20',
		)
		this.#sectionList = this.createMenuList([
			{ name: 'about' },
			{ name: 'skills' },
			{ name: 'projects' },
			{ name: 'education' },
		]);

		// Append the elements to the parent
		this.#logoWrapper.appendChild(this.#logoObject);
		this.#container.appendChild(this.#logoWrapper);
		this.#container.appendChild(this.#sectionList);

		// Add events
		// scrollableEl.addEventListener('scroll', () => {
		// 	console.log(window.scrollY);
		// });
	}

	private createMenuList(items: Array<HeaderListArgs>): HTMLUListElement {
		const sectionSelection = document.createElement('ul');
		sectionSelection.classList.add(
			'hidden',
			'md:flex',
			'lg:flex',
			'xl:flex',
			'items-center',
			'space-x-4',
			'md:space-x-6',
			'lg:space-x-8',
			'font-layout'
		);

		for (let i = 0; i < items.length; i++) {
			const listItem = document.createElement('li');
			const sectionLink = document.createElement('a');

			sectionLink.href = `#${items[i].name}`;
			sectionLink.textContent = items[i].name.toUpperCase();
			sectionLink.classList.add(
				'text-downy-source',
				'hover:text-downy-100',
				'px-2',
				'py-1',
				'transition',
				'duration-300',
				'hover:cursor-pointer'
			);

			listItem.appendChild(sectionLink);
			sectionSelection.appendChild(listItem);
		}

		return sectionSelection;
	}

	public getElement(): HTMLDivElement {
		return this.#container;
	}
}