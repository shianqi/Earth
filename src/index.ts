import App from './App'

const main = () => {
  let element = document.getElementById('app-root')
  let info = document.getElementById('app-info')

  if (!element) {
    element = document.createElement('div')
    document.body.appendChild(element)

    document.querySelector('html').style.cssText = `
      height: 100%;
    `
    document.body.style.cssText = `
      height: 100%;
      margin: 0;
    `
    element.style.cssText = `
      height: 100%;
    `
  }

  if (!info) {
    info = document.createElement('div')
    info.id = 'app-info'
    document.body.appendChild(info)

    info.style.cssText = `
      position: fixed;
      top: 16px;
      right: 16px;
      color: #535353;
    `

    info.innerText = 'Click anywhere to get coordinates'
  }

  const myapp = new App({ app: element })
  myapp.animate()
}

export default main()
