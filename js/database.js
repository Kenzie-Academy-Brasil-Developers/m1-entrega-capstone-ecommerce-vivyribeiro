// Banco de dados dos produtos

const data = [
	{
		id: 1,
		img: "./img/products/earring1.png",
		nameItem: "Brincos de Ouro Portlligat",
		description:
			"Dinamizados e modernos, esses brincos brilham como o horizont...",
		value: 1000,
		quantityNumbers: 1,
		addCart: "Adicionar ao carrinho",
		tag: ["Brincos"]
	},
	{
		id: 2,
		img: "./img/products/necklace1.png",
		nameItem: "Pingente Folhas de Oliveira",
		description: "Inspirado no ramo de oliveira, um símbolo de paz...",
		value: 1200,
		quantityNumbers: 1,
		addCart: "Adicionar ao carrinho",
		tag: ["Colares"]
	},
	{
		id: 3,
		img: "./img/products/necklace4.png",
		nameItem: "T1 Pingente Circular",
		description:
			"Traçado em diamantes cintilantes, o desenho de ponta biselada deste pingente...",
		value: 1240,
		quantityNumbers: 1,
		addCart: "Adicionar ao carrinho",
		tag: ["Colares"]
	},
	{
		id: 4,
		img: "./img/products/earring3.png",
		nameItem: "Brincos Gancho de Bolat",
		description:
			"Brincos elegantes e simples de cair adicionam um toque moderno a qualquer visual...",
		value: 1100,
		quantityNumbers: 1,
		addCart: "Adicionar ao carrinho",
		tag: ["Brincos"]
	},
	{
		id: 5,
		img: "./img/products/necklace2.png",
		nameItem: "Pingente X Interligado",
		description:
			"Uma delicada corrente de ouro amarelo 18k combinada com dois círculos de interligação...",
		value: 1500,
		quantityNumbers: 1,
		addCart: "Adicionar ao carrinho",
		tag: ["Colares"]
	},
	{
		id: 6,
		img: "./img/products/earring2.png",
		nameItem: "Brincos Folhas de Azeitona",
		description: "Os diamantes deslumbram-se sobre as folhas no formato...",
		value: 1300,
		quantityNumbers: 1,
		addCart: "Adicionar ao carrinho",
		tag: ["Brincos"]
	},
	{
		id: 7,
		img: "./img/products/earring4.png",
		nameItem: "Brincos de Barra",
		description:
			"Estas barras ousadas são um brinco moderno. Tão multifacetada quanto icônica...",
		value: 950,
		quantityNumbers: 1,
		addCart: "Adicionar ao carrinho",
		tag: ["Brincos"]
	},
	{
		id: 8,
		img: "./img/products/necklace3.png",
		nameItem: "Colar Pingente de Esmeralda",
		description:
			"Estilize esta corrente ajustável com outros pingentes para um...",
		value: 1890,
		quantityNumbers: 1,
		addCart: "Adicionar ao carrinho",
		tag: ["Colares"]
	},
	{
		id: 9,
		img: "./img/products/necklace5.png",
		nameItem: "Colar de Ouro Splash",
		description:
			"Tão multifacetado quanto icônico, esse colar é um lembrete tangível...",
		value: 1150,
		quantityNumbers: 1,
		addCart: "Adicionar ao carrinho",
		tag: ["Colares"]
	}
];

// console.log(data[0]);

// OLD DATA BASE
/*
{
		id: 1,
		img: "../img/jaqueta.svg",
		nameItem: "Lightweight Jacket",
		description:
			"Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante e mais...",
		value: 100,
		addCart: "Adicionar ao carrinho",
		tag: ["Camisetas"]
	},
	{
		id: 2,
		img: "../img/gorro.svg",
		nameItem: "Gorro Black Next",
		description:
			"O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que e mais...",
		value: 100,
		addCart: "Adicionar ao carrinho",
		tag: ["Acessórios"]
	},
	{
		id: 3,
		img: "../img/mascara.svg",
		nameItem: "Máscara Preta",
		description:
			"Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas e mais...",
		value: 40,
		addCart: "Adicionar ao carrinho",
		tag: ["Acessórios"]
	},
	{
		id: 4,
		img: "../img/camiseta_branca.svg",
		nameItem: "Short-Sleeve T-Shirt",
		description:
			"Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
		value: 100,
		addCart: "Adicionar ao carrinho",
		tag: ["Camisetas"]
	},
	{
		id: 5,
		img: "../img/camiseta_branca_feminina.svg",
		nameItem: "Camiseta Feminina Branca",
		description:
			"A base confort é uma camiset feminina no seu conforto. Seu material é leve...",
		value: 100,
		addCart: "Adicionar ao carrinho",
		tag: ["Camisetas"]
	},
	{
		id: 6,
		img: "../img/camiseta_preta_feminina.svg",
		nameItem: "Camiseta Stilo Feminina",
		description:
			"A camiseta perfeita para tempos de frio leve, com tecido grosso e confortável para o dia a dia e mais...",
		value: 100,
		addCart: "Adicionar ao carrinho",
		tag: ["Camisetas"]
	},
	{
		id: 7,
		img: "../img/moletom.svg",
		nameItem: "Camiseta Longa Masculina",
		description:
			"A camiseta prime longa traz cconforto e um toque de charme, seu materia...",
		value: 100,
		addCart: "Adicionar ao carrinho",
		tag: ["Camisetas"]
	},
	{
		id: 8,
		img: "../img/moletom.svg",
		nameItem: "Boné Masculino Branco",
		description:
			"O boné pala reta é um dos mais clássicos, te deixa com visual descolado e atual sem esforços...",
		value: 89,
		addCart: "Adicionar ao carrinho",
		tag: ["Camisetas"]
	},
	{
		id: 9,
		img: "../img/gorro_classic_preto",
		nameItem: "Boné Masculino Branco",
		description:
			"O gorro classic, é o mais popular do mercado. Cheio de simplicidade e estilo, além de garantir...",
		value: 100,
		addCart: "Adicionar ao carrinho",
		tag: ["Camisetas"]
	}
*/
