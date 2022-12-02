const fs = require('fs')
const { loadImage, createCanvas } = require('canvas')


exports.createImage = async(price,side)=>{
    const width = 1600
    const height = 418
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
    loadImage('./images/bannerImage.png').then((data) => {
      context.drawImage(data, 0, 0, 1600, 418)
      if(side==='up'){
        context.fillStyle = '#065712'
      }else if(side==='down'){
        context.fillStyle = '#660507'
      }else {
        context.fillStyle = '#000000'
      }
      
      context.font = 'bold 72pt Sans'
      context.fillText(`$ ${price}`, 600,250,400)
      const imgBuffer = canvas.toBuffer('image/png')
      fs.writeFileSync('./resources/drawnImage.png', imgBuffer)
    })

}
