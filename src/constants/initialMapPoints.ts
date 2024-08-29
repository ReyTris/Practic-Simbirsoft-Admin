export interface IStreetEntry {
	street: string;
	coordinate: [number, number];
}
export const citiesList: string[] = ['Ульяновск', 'Самара', 'Москва', 'Казань'];
export const streetList: Record<string, IStreetEntry[]> = {
	Ульяновск: [
		{ street: 'Пушкарёва, 11', coordinate: [54.314396, 48.353366] },
		{ street: 'Воробьёва, 84', coordinate: [54.317786, 48.381715] },
		{
			street: 'Комсомольский переулок, 3Б',
			coordinate: [54.314297, 48.387609],
		},
		{
			street: 'Университетская Набережная, 1',
			coordinate: [54.302667, 48.368439],
		},
	],
	Самара: [
		{ street: 'Мичурина, 21Б', coordinate: [53.203668, 50.141375] },
		{ street: 'Арцыбушевская улица, 45', coordinate: [53.192726, 50.116033] },
		{ street: 'Южный проезд, 104', coordinate: [53.178484, 50.198269] },
		{ street: 'Коленчатая улица, 20Б', coordinate: [53.183048, 50.233692] },
	],
	Москва: [
		{
			street: 'Малый Лёвшинский переулок, 7с1',
			coordinate: [55.741996, 37.588932],
		},
		{ street: 'Большая Полянка, 44', coordinate: [55.732405, 37.619412] },
		{
			street: '2-й Верхний Михайловский проезд, 5',
			coordinate: [55.709033, 37.604485],
		},
		{ street: '4-й Рощинский проезд, 19', coordinate: [55.705676, 37.61167] },
	],
	Казань: [
		{ street: 'Хлебозаводская улица, 7', coordinate: [55.843463, 49.050904] },
		{ street: 'Тунакова, 58', coordinate: [55.83266, 49.085094] },
		{ street: 'Мусина, 59', coordinate: [55.833489, 49.122608] },
		{ street: 'Алексея Козина, 9', coordinate: [55.814574, 49.139023] },
	],
};
