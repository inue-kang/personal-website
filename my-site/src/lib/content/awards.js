// ─────────────────────────────────────────────────────────────
// AWARDS — edit this file to add/remove/change achievements.
// Each year becomes a black orb on /awards; each award inside a
// year becomes a node attached to it. Clicking a node opens a
// popup built from these fields.
// See src/lib/content/README.md for a field-by-field guide.
// ─────────────────────────────────────────────────────────────

const OBJ_HACK =
	'Create the most functional and aesthetically pleasing project that aligns with the theme.';
const OBJ_CODE = 'Get the most points from solving coding problems.';
const OBJ_CTF = 'Score the most points from solving different sets of cybersecurity problems.';

export const years = [
	{
		year: '2025',
		awards: [
			{
				id: 'ipc25',
				name: "IPC Hack '25", // short label inside the node circle
				place: '1st',
				date: '2/27/25',
				title: 'Interlake Programming Club Winter Hackathon 2025',
				meta: 'Local - In Person - Hackathon - Team Competition - 1st Place Overall',
				members: 'Inue Kang / ben-6',
				link: {
					label: 'IPC Winter Hackathon (Devpost Link)',
					href: 'https://ipc-mid-winter-hackathon-2025.devpost.com/'
				},
				objective: OBJ_HACK,
				theme: 'Develop a software or web-based solution that addresses weather challenges through a other solution for communities facing both extreme and routine weather challenges.',
				project: {
					label: 'AccliMate (Devpost Link)',
					href: 'https://devpost.com/software/acclimate-26zdjt'
				}
			},
			{
				id: 'accesshack25',
				name: 'AccessHack',
				place: '3rd',
				date: '2/16/25',
				title: '2025 EMP Hackfest - AccessHack',
				meta: 'Local - Online - Hackathon - Team Competition - 3rd Place - Group 2',
				members: 'Inue Kang / refact0r / arrayman',
				link: {
					label: 'AccessHack - 8th EmP Hackfest (Main Site)',
					href: 'https://emphackfest.org/february-2025'
				},
				objective: OBJ_HACK,
				theme: 'Resource Accessibility - Develop a solution that facilitates and assists in the accessibility of natural/urban resources',
				project: {
					label: 'pinScout (Devpost Link)',
					href: 'https://devpost.com/software/pinscout?ref_content=my-projects-tab&ref_feature=my_projects'
				}
			}
		]
	},
	{
		year: '2024',
		awards: [
			{
				id: 'spacehack24',
				name: 'SpaceHack',
				place: '1st',
				date: '9/8/24',
				title: '2024 EMP Hackfest - SpaceHack',
				meta: 'Local - In Person - Hackathon - Team Competition - 1st Place - Group 3',
				members: 'Inue Kang / refact0r / static void / arrayman',
				link: {
					label: 'SpaceHack - 7th EmP Hackfest (Main Site)',
					href: 'https://emphackfest.org/september-2024-1'
				},
				objective: OBJ_HACK,
				theme: 'Develop a solution that assists in space exploration or technology.',
				project: {
					label: 'cmail (Devpost Link)',
					href: 'https://devpost.com/software/cmail?ref_content=my-projects-tab&ref_feature=my_projects'
				}
			},
			{
				id: 'changbal24',
				name: "Changbal '24",
				place: '1st',
				date: '5/18/24',
				title: 'Changbal Road to Tech 2024 - Coding Contest',
				meta: 'Local - In Person - Coding Contest - Individual Competition - 1st Place - 12th Grade',
				link: null, // null shows "Currently Unavailable"
				objective: OBJ_CODE
			},
			{
				id: 'hackpnw24',
				name: 'HackPNW',
				place: '2nd',
				date: '3/3/24',
				title: 'HackPNW Spring 2024',
				meta: 'State - In Person - Hackathon - Team Competition - 2nd Place - Design',
				members: 'Inue Kang / refact0r / ben-6 / NicoNekoru',
				link: { label: 'HackPNW Spring 2024 (Main Site)', href: 'https://spring.2024.hackpnw.org/' },
				objective: OBJ_HACK,
				theme: 'Education',
				project: { label: 'papercut (Github Link)', href: 'https://github.com/refact0r/papercut' }
			},
			{
				id: 'ipc24',
				name: "IPC Hack '24",
				place: '1st',
				date: '1/17/24',
				title: 'Interlake Programming Club Winter Hackathon 2024',
				meta: 'Local - In Person - Hackathon - Team Competition - 1st Place - Overall',
				members: 'Inue Kang / refact0r / ben-6',
				link: {
					label: 'IPC Winter Hackathon (Devpost Link)',
					href: 'https://ihs-winter-hackathon.devpost.com/'
				},
				objective: OBJ_HACK,
				theme: 'Develop a technology solution (app, website, or interactive simulation/game) that addresses a specific health issue.',
				project: { label: 'respir (Devpost Link)', href: 'https://devpost.com/software/respir' }
			}
		]
	},
	{
		year: '2023',
		awards: [
			{
				id: 'changbal23',
				name: "Changbal '23",
				place: '1st',
				date: '5/20/23',
				title: 'Changbal Road to Tech 2023 - Coding Contest',
				meta: 'Local - In Person - Coding Contest - Individual Competition - 1st Place - 11th Grade',
				link: {
					label: 'Changbal Road to Tech 2023 (Main Site)',
					href: 'https://www.changbal.org/post/%EC%8F%9F%EC%95%84%EC%A7%80%EB%8D%98-%ED%96%87%EC%82%B4%EC%B2%98%EB%9F%BC-%EB%9C%A8%EA%B1%B0%EC%9B%A0%EB%8D%98-%EC%B2%AB%EB%B2%88%EC%A7%B8-%EC%B0%BD%EB%B0%9C-road-to-tech%ED%96%89%EC%82%AC'
				},
				objective: OBJ_CODE
			}
		]
	},
	{
		year: '2022',
		awards: [
			{
				id: 'ntsa22',
				name: 'TSA Nationals',
				place: '2nd',
				date: '6/30/22',
				title: '2022 National Technology Student Association Cybersecurity Conference',
				meta: 'National - In Person - Capture The Flag - Team Competition - 2nd Place - Overall',
				link: {
					label: '2022 National TSA Conference Results (Main Site)',
					href: 'https://tsamembership.registermychapter.com/finalplacement/ntc2022#'
				},
				objective: OBJ_CTF
			},
			{
				id: 'bcactf22',
				name: 'BCACTF 3.0',
				place: '19th',
				date: '6/7/22',
				title: 'BCACTF 3.0 2022',
				meta: 'National - Online - Capture The Flag - Team Competition - 19th Place - Overall',
				link: { label: 'BCACTF 3.0 Results (CTFtime Link)', href: 'https://ctftime.org/event/1602' },
				objective: OBJ_CTF
			},
			{
				id: 'byuctf22',
				name: 'BYUCTF',
				place: '13th',
				date: '5/29/22',
				title: 'BYUCTF 2022',
				meta: 'National - Online - Capture The Flag - Team Competition - 13th Place - Overall',
				link: { label: 'BYUCTF 2022 Results (CTFtime Link)', href: 'https://ctftime.org/event/1660' },
				objective: OBJ_CTF
			},
			{
				id: 'watsa22',
				name: 'TSA WA State',
				place: '2nd',
				date: '3/19/22',
				title: '2022 Washington State Technology Student Association Cybersecurity Conference',
				meta: 'State - In Person - Capture The Flag - Team Competition - 2nd Place - Overall',
				link: null,
				objective: OBJ_CTF
			}
		]
	}
];
