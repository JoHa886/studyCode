function renderMap(map) {
  if (map.show instanceof Function) {
    map.show()
  }
}

const baiduMap = {
  show() {
    console.log('百度地图')
  }
}
const googleMap = {
  show() {
    console.log('谷歌地图')
  }
}
