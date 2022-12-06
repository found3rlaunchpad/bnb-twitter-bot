const fs = require('fs')
const { loadImage, createCanvas } = require('canvas')

// const createImage = async(price,side)=>{
exports.createImage = async(price,side)=>{
    const width = 462
    const height = 226
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')
    // context.fillStyle = '#2b03a3'
    // context.fillRect(0, 0, width, height)
    // context.font = 'bold 72pt Menlo'
    // context.textBaseline = 'top'
    // context.textAlign = 'center'
    // context.fillStyle = '#f7ab07'
    // const imgText = 'Tiny Text on Canvas'
    // const textAlign = context.measureText(imgText).width
    // context.fillRect(590 - textAlign / 2 - 10, 170 - 5, textAlign + 20, 120)
    // context.fillStyle = '#ffffff'
    // context.fillText(imgText, 555, 120)
    // context.fillStyle = '#ffffff'
    // context.font = 'bold 32pt Menlo'
    // context.fillText('positronx.io', 755, 600)
    loadImage('./images/bannerImage2.png').then((data) => {
      context.drawImage(data, 0, 0, 462, 226)
      if(side==='up'){
        context.fillStyle = '#D92B2B'
      }else if(side==='down'){
        context.fillStyle = '#7CB351'
      }else {
        context.fillStyle = '#3C3C22'
      }
      
      context.font = 'bold 28pt Sans'
      context.fillText(`$${price.toFixed(2)}`, 150,65,170)
      const imgBuffer = canvas.toBuffer('image/png')
      fs.writeFileSync('./resources/drawnImage.png', imgBuffer)
    })

}

// createImage(292.23,'down')
