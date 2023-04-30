let checks = document.querySelectorAll('.form-check-input');
class Pedido {
	constructor(pizza, extras, propina) {
		this.valorPizza = pizza;
		this.valorExtras = extras;
		this.valorPropina = propina;
	}
	get total() {
		return this.calcularTotal();
	}
	calcularTotal() {
		return this.valorPizza + this.valorExtras + this.valorPropina;
	}
	notificarPedido() {
		alert(
			`Su propina de ${formatearDivisa.format(
				this.valorPropina
			)} ha sido enviada`
		);
	}
}

let arrChecks = [...checks];
let ingredientes = [];
let extras = [];
let arrSumador = [];

const rellenarArraysIngredientes = () => {
	let enviarIngredientes = arrSumador.slice(0, 3);
	ingredientes = enviarIngredientes;
	let enviarExtras = arrSumador.slice(3);
	extras = enviarExtras;
};
const mostrarDatos = () => {
	rellenarArraysIngredientes();
	mostrarIngredientes(displayIngredientes, ingredientes);
	mostrarIngredientes(displayExtras, extras);
	mostrarPrecioExtras();
};
arrChecks.forEach((check) => {
	check.addEventListener('change', () => {
		if (check.checked) {
			arrSumador.push(check.value);
			mostrarDatos();
		} else {
			let index = arrSumador.indexOf(check.value);
			arrSumador.splice(index, 1);
			mostrarDatos();
		}
	});
});
const formatearDivisa = new Intl.NumberFormat('es-CL', {
	style: 'currency',
	currency: 'CLP',
});
// Muestra ingredientes en su respectiva ubicacion (ingredientes gratis o extras)
const mostrarIngredientes = (locacion, listaIngredientes) => {
	locacion.innerHTML = listaIngredientes.join(', ');
};
const calcularExtras = () => {
	return extras.length * 800;
};
// Muestra el precio de los ingredientes extras

const mostrarPrecioExtras = () => {
	displayPrecioExtras.innerHTML = formatearDivisa.format(calcularExtras());
};
// Muestra propina en tabla, con parametro por defecto en caso que cliente no ingrese nada
mostrarPropina = (locacion, valor = 1000) => {
	let formatted = parseInt(valor).toLocaleString('es-CL', {
		style: 'currency',
		currency: 'CLP',
	});
	locacion.innerHTML = formatted;
};
propinaInput.addEventListener('focus', () => {
	mostrarPropina(displayPropina, undefined);
});
formPedido.addEventListener('submit', (event) => {
	event.preventDefault();
	let propina = document.getElementById('propinaInput').value;
	let valorPropina = propina.toLocaleString('es-CL', {
		style: 'currency',
		currency: 'CLP',
	});
	if (valorPropina == '' || valorPropina < 0) {
		alert('Aún no ha definido una propina');
	} else {
		mostrarPropina(displayPropina, valorPropina);
		const pedido = new Pedido(15000, calcularExtras(), parseInt(propina));
		console.log(pedido);
		pedido.notificarPedido();
		formPedido.reset();
		formIngredientes.reset();
		ingredientes = [];
		extras = [];
		arrSumador = [];
		mostrarDatos();
	}
});
