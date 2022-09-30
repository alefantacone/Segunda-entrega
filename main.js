const productos = [
    {
        id: 1,
        nombre: "Azucar x50kg",
        img: "/assets/img/azucar 50.jpeg",
        precio: 6500,
        cantidad: 600
    },
    {
        id: 2,
        nombre: "Azucar x10kg",
        img: "/assets/img/azucar 10.jpeg",
        precio: 1400,
        cantidad: 700
    },
    {
        id: 3,
        nombre: "Maiz x50kg",
        img: "/assets/img/maiz.jpeg",
        precio: 1600,
        cantidad: 100
    },
    {
        id: 4,
        nombre: "Alimento cerdo x40kg",
        img: "/assets/img/alimento cerdo.jpeg",
        precio: 2100,
        cantidad: 15
    },
    {
        id: 5,
        nombre: "Alimento pollo x40kg",
        img: "/assets/img/alimento pollo.jpeg",
        precio: 2400,
        cantidad: 10
    },
    {
        id: 6,
        nombre: "Papas fritas x1kg",
        img: "/assets/img/papas fritas.jpeg",
        precio: 950,
        cantidad: 3
    },
    {
        id: 7,
        nombre: "Jeringa para cucarachas 12g",
        img: "/assets/img/jeringas.jpeg",
        precio: 650,
        cantidad: 7
    },
    {
        id: 8,
        nombre: "Veneno ratas x1Kg",
        img: "/assets/img/ratas.jpeg",
        precio: 7000,
        cantidad: 2
    },
];

const carrito = [];

const pintarProductos = () => {
    const contenedorProductos = document.getElementById('tienda');
    productos.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('col-12', 'col-md-4', 'mb-5', 'd-flex', 'justify-content-center');
        div.innerHTML = ` 
        <div class="card" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p> Precio: ${producto.precio}</p>
                <button class="btn btn-primary" id="${producto.id}">Añadir al carrito</button>
            </div>
        </div>
        `
        contenedorProductos.appendChild(div);
        
        div.querySelector('button').addEventListener('click', ()=>{
            agregarProductosAlCarrito(producto.id);
        })
    })
}

pintarProductos();

const agregarProductosAlCarrito = (id) => {
    const agregarCarrito = productos.find(producto => producto.id === id);

    const productoRepetido = carrito.find(producto => producto.id === id);
    
    if(productoRepetido){
        productoRepetido.cantidad++;
        console.log(carrito);
    }else{
        agregarCarrito.cantidad = 1;
        carrito.push(agregarCarrito);
        console.log(carrito);
    }

    pintarCarrito();
    calcularTotal();
    
}

const pintarCarrito = () => {
    let carritoHtml = document.getElementById('carrito');

    carritoHtml.innerHTML = " ";

    carrito.forEach((producto, indice)=> {
        let div = document.createElement('div');
        div.classList.add('col-12', 'col-md-4', 'mb-5', 'd-flex', 'justify-content-center');
        div.innerHTML = ` 
        <div class="card" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p> Precio: ${producto.precio}</p>
                <p> Cantidad: ${producto.cantidad}</p>
                <button class="btn btn-primary" id="${producto.id}">Eliminar</button>
            </div>
        </div>
        `

        div.querySelector('button').addEventListener('click', ()=>{
            eliminarProducto(indice);
        })
        

    carritoHtml.appendChild(div);    
    })
}

const eliminarProducto = (indice) => {
    carrito[indice].cantidad--;
    if(carrito[indice].cantidad === 0){
        carrito.splice(indice,1);
    }
    pintarCarrito();
    calcularTotal();
}

const calcularTotal = () => {
    let total = 0;

    carrito.forEach((producto)=>{
        total += producto.precio * producto.cantidad;
    })
    console.log(total);

    const totalCompra = document.getElementById('total');
    totalCompra.innerHTML = `<h4>$${total}<h4>`

    guardarCarritoStorage(carrito);
}


const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
const extraerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
};