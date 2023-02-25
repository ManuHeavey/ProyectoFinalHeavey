function getWeapons(done) {
	const url = 'https://eldenring.fanapis.com/api/weapons?limit=60'

	const results = fetch(url)
	results
		.then(res => res.json())
		.then(data => (done(data)))
}

getWeapons(data => {

	console.log(data)
	data.data.forEach(weapon => {

		const tiendaWeapons = document.createRange().createContextualFragment(
			`
        <div class="col-sm-4">
          <div class="card">
            <img src="${weapon.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${weapon.name}</h5>
                <p class="card-text">${weapon.description}</p>
              </div>
              <div class="buying">
                <button id="minus${weapon.id}"><img src="../public/img/minus.png" alt="minus"></button>
                <div><span id="total${weapon.id}">0</div>
                <button id="add${weapon.id}"><img src="../public/img/plus.png" alt="plus"></button>
              </div>
            </div>
          </div>
        </div>
      `
		)
		
		const main = document.querySelector("main")
		main.append(tiendaWeapons)

		const totalId = `total${weapon.id}`
		const addId = `add${weapon.id}`
		const minusId = `minus${weapon.id}`

		document.querySelector(`#${addId}`).addEventListener("click", () => {
			add(totalId)
		})

		document.querySelector(`#${minusId}`).addEventListener("click", () => {
			minus(totalId)
		})
	})
})

const alertMixin = {
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 1500,
}

const minusAlertConfig = {
  ...alertMixin,
  icon: 'error',
  title: 'Se quito un arma del carrito.',
}

const addAlertConfig = {
  ...alertMixin,
  icon: 'success',
  title: 'Se agrego un arma al carrito.',
}

function minus (totalId) {
	const totalElement = document.querySelector(`#${totalId}`)
	let total = parseInt(totalElement.textContent)
	if (total > 0) {
		total -= 1
		totalElement.textContent = total      
	}
  Swal.fire(minusAlertConfig)
}

function add (totalId) {
	const totalElement = document.querySelector(`#${totalId}`)
	let total = parseInt(totalElement.textContent)
	total += 1
	totalElement.textContent = total
  Swal.fire(addAlertConfig)
}

async function refreshPage() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  location.reload();
}

document.querySelector("#buyButton").addEventListener("click", () => {
  swal.fire({
    title: "Gracias por su compra!",
    icon: "success",
    timer: 3000,
    showConfirmButton: false,
  }).then(() => {
    refreshPage();
  });
})