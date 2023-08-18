import {
	Skill,
	SkillCategories,
	SkillLevelsValues,
	SkillLevels,
	SkillCategoriesKeys,
	SkillCategoriesValues
} from './index.types';

interface SkillsInstanceArgs {
	skills: Array<Skill>
}

const skillLevelColors: Array<string> = [
	'bluemine-100',
	'bluemine-400',
	'downy-500',
	'frostedmint-source',
	'bluemine-source',
];

const skillCategories: { key: SkillCategoriesKeys, value: SkillCategoriesValues }[]
	= Object.keys(SkillCategories).map(key => ({
		key: key as SkillCategoriesKeys,
		value: SkillCategories[key as keyof typeof SkillCategories] as SkillCategoriesValues
	}));

const skillLevels: { key: keyof typeof SkillLevels, value: SkillLevelsValues }[]
	= Object.keys(SkillLevels).map(key => ({
		key: key as unknown as keyof typeof SkillLevels,
		value: SkillLevels[key as unknown as keyof typeof SkillLevels] as SkillLevelsValues
	}))

export default class Skills {
	#portfolioSection: HTMLElement;
	#sectionName: HTMLHeadingElement;
	#container: HTMLDivElement;
	#skillCategories: HTMLDivElement;

	constructor({ skills }: SkillsInstanceArgs) {
		this.#portfolioSection = document.createElement('section');
		this.#sectionName = document.createElement('h1');
		this.#sectionName.textContent = 'Skills';
		this.#container = document.createElement('div');
		this.#skillCategories = document.createElement('div');

		this.#portfolioSection.appendChild(this.#sectionName);
		this.#portfolioSection.appendChild(this.#container);
		this.#container.appendChild(
			this.createSkillLevelLegend(skillLevels.map(sl => sl.value))
		)
		this.#container.appendChild(this.#skillCategories);

		for (const skillCategory of skillCategories) {
			const filteredSkills = skills.filter(skill => {
				return skill.category === skillCategory.key;
			})
				.sort((a, b) => { // sort by experience
					const bLevelIndex = Number(skillLevels.find(sl => sl.value === b.level).key);
					const aLevelIndex = Number(skillLevels.find(sl => sl.value === a.level).key);

					return bLevelIndex - aLevelIndex;
				});

			this.#skillCategories.appendChild(this.createSkillCategory(filteredSkills));
		}

		this.#portfolioSection.classList.add('portfolio-section');
		this.#sectionName.classList.add('section-text-heading');
		this.#container.classList.add(
			'font-sans',
			'flex',
			'flex-col',
		)
	}

	private createSkillLevelLegend(skillLevels: Array<SkillLevelsValues>): HTMLDivElement {
		const legend = document.createElement('div');
		legend.classList.add(
			'flex',
			'flex-row',
			'flex-wrap',
			'gap-8',
			'justify-center',
			'select-none',
			'mb-12',
			'px-6'
		)

		for (let i = 0; i < skillLevels.length; i++) {
			const legendItem = document.createElement('span');
			const colorLevel = document.createElement('div');
			const skillLevel = document.createElement('p');
			skillLevel.textContent = skillLevels[i];
			const textColor = `text-${skillLevelColors[i]}`;
			const bgColor = `bg-${skillLevelColors[i]}`;

			legendItem.appendChild(colorLevel);
			legendItem.appendChild(skillLevel);
			legend.appendChild(legendItem);

			legendItem.classList.add(
				'inline-flex',
				'items-center',
				'gap-3'
			)
			colorLevel.classList.add(
				bgColor,
				'w-4',
				'h-4'
			)
			skillLevel.classList.add(
				textColor
			)
		}

		return legend;
	}

	private createSkillCategory(skillsByCategory: Array<Skill>): HTMLDivElement {
		const skillCategoryContainer = document.createElement('div');
		const skillCategoryText = document.createElement('h2');
		skillCategoryText.textContent = SkillCategories[skillsByCategory[0]?.category] || '';
		const skillList = document.createElement('div');

		skillCategoryContainer.appendChild(skillCategoryText);
		skillCategoryContainer.appendChild(skillList);

		skillCategoryContainer.classList.add(
			'mb-6',
			'pl-8',
			'md:pl-12',
			'lg:pl-12',
			'xl:pl-12',
			'2xl:pl-12',
		)
		skillCategoryText.classList.add(
			'mb-4',
			'text-bluemine-300',
			'text-xl'
		)
		skillList.classList.add(
			'flex',
			'flex-row',
			'flex-wrap',
			'ml-12',
			'md:ml-18',
			'lg:ml-24',
			'gap-4',
			'ml-4'
		)

		for (let i = 0; i < skillsByCategory.length; i++) {
			const skill = skillsByCategory[i];
			const skillEl = document.createElement('div');
			const skillText = document.createElement('p');
			skillText.textContent = skill.name;

			// color and skill level are associated by arr index
			const colorIndex = skillLevels.findIndex(l => l.value === skill.level);
			const color = skillLevelColors[colorIndex];
			const textColor = `text-${color}`
			const borderColor = `border-${color}`

			skillEl.classList.add(
				'flex',
				'flex-row',
				'flex-wrap',
				'items-start',
				'px-6',
				'py-2',
				borderColor,
				'border-2',
				'rounded-md',
			)

			skillText.classList.add(
				textColor,
				'font-semibold'
			)

			skillEl.appendChild(skillText);
			skillList.appendChild(skillEl);
		}

		return skillCategoryContainer;
	}

	public getElement(): HTMLElement {
		return this.#portfolioSection;
	}
}