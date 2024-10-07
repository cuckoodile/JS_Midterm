// const data = {
//     "dahlia":           ["media/dahlia.png", 120, "Bursting with layers of intricate petals, dahlias are vibrant and striking, symbolizing elegance and dignity. They come in a plethora of colors, each more captivating than the last."],
//     "daffodil":         ["media/daffodil.png", 200, "These cheerful, trumpet-shaped flowers are a herald of spring, often embodying rebirth and new beginnings. Their bright yellow hue is like a ray of sunshine on a clear day."],
//     "daisy":            ["media/daisy.png", 50, "Simple yet charming, daisies represent innocence and purity. With their white petals and sunny yellow centers, they bring a fresh, uplifting vibe to any bouquet."],
//     "hibiscus":         ["media/hibiscus.png", 90, "With large, exotic blooms in vivid shades, hibiscus flowers are a tropical treasure. They symbolize delicate beauty and are often associated with relaxation and leisurely pursuits."],
//     "lily":             ["media/lily.jfif", 400, "Majestic and fragrant, lilies are a symbol of purity and refined beauty. Their large, graceful petals and intoxicating scent make them a favorite in gardens and floral arrangements alike."],
//     "orchid":           ["media/orchid.png", 450, "Exotic and elegant, orchids are a symbol of luxury and strength. Their unique and intricate flowers stand out with an array of stunning patterns and colors."],
//     "peony":            ["media/peony.png", 100, "These lush, full blooms are synonymous with romance and prosperity. Peonies’ delicate petals and sweet fragrance add a touch of opulence to any setting."],
//     "rose":             ["media/rose.jfif", 500, "The quintessential symbol of love and passion, roses come in an endless variety of colors and each hue carries its own meaning. From deep red to soft pink, roses never fail to make an impression."],
//     "tulip":            ["media/tulip.png", 600, "Graceful and colorful, tulips represent perfect love and elegance. Their simple yet bold appearance makes them a timeless favorite, especially in springtime gardens."],
//     "sunflower":        ["media/sunflower.png", 350, "Tall and radiant, sunflowers symbolize adoration and loyalty. Their bright yellow faces follow the sun, spreading warmth and positivity wherever they grow."],
// }

function dataToLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data))
}

function get_data() {
    let localData =  localStorage.getItem('data')
    let returnData = JSON.parse(localData)
    return returnData
}

let fetched_data = get_data()

let data = []
data.push(...fetched_data)
console.log(data)

// localStorage.clear()
// console.log(JSON.stringify(localStorage));


// data[0].price = "RICELESS"
// data[0].status = "06/11/06"
// data[0].description = "A mesmerizing and rare quality of beauty you've never seen before!"
// console.log(data)

// dataToLocalStorage(data)
// console.log("Done")