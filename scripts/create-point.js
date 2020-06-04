// getting states (UF)
function populateUFs() {
    //acessando o seletor no html
    const ufSelect = document.querySelector("select[name=uf]")
    //buscando estados no ibge
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res => res.json() ) // essa notacao eh a mesma que: (resp) => {return resp.json()}. É usada quando se tem apenas uma resposta e output
    .then ( states => {
        //acessa cada state e o coloca no array ufSelect
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
//teste:    console.log(ufSelect)
    })
}
//chamando a função
populateUFs()

//getting cities of each state
function getCities(event) {
    //acessando o select do html para city
    const citySelect = document.querySelector("select[name=city]")
    // para mudar de nr pelo nome na url quando form for enviado. Acessando o input hidden, que receberá o nome do estado e enviará para a url
    const stateInput = document.querySelector("input[name=state]")
    //pegando o id do estado através do valor do evento disparado pelo addEventListener
    const ufID = event.target.value
    //pegar o index do estado selecionado
    const indexOfSelectedState = event.target.selectedIndex
    //passa o index para options que retorna o nome do estado, subtituindo o value do input hidden
    stateInput.value = event.target.options[indexOfSelectedState].text
    // console.log(ufID)
    //add o id na url do ibge
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufID}/municipios`
    // https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios
    //buscando cidades no ibge
    // console.log(url)
    fetch(url)
        .then( (res) => { return res.json() })  //a resposta do fetch é o parametro res(posta), que é passada para parser de json pelo .json
        .then( (cities) => { //console.log(cities) })
            //o json parseado, é passado como arg cities. Aí é só iterar pela lista de objetos e jogar devolta ao citySelector
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            citySelect.disabled = false;
        })
}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)
