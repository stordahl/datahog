const glob = require("glob")
const fs = require("fs/promises")

const constructVariant = (url) => {
  let pathLength
  let _url = new URL(url),
      path = _url.pathname.split('/')
  pathLength = path.length
  cleanPath = path.splice(0, 1)
  
  let name = path.at(-1).split('.')[0]
  
  if(pathLength === 3) return `iife-${name}` 
  return `${path[0]}-${path[1]}-${name}`
}

let entries = []

console.log('☕️ Starting Parser')

glob(".lighthouseci/lhr-*.json", { nonull: true }, async function (er, files) {
  await files.forEach(async (filePath, index) => {
    const isFinished = index === (files.length - 1)
    try {
      const data = await fs.readFile(filePath, { encoding: 'utf-8' })
      const parse = JSON.parse(data)
      const { audits, finalUrl, fetchTime } = parse
      const variant = constructVariant(finalUrl)
      const time_stamp = new Date(fetchTime).toISOString()
      
      const parsed = {
        variant,
        time_stamp,
        first_contentful_paint: audits['first-contentful-paint'],
        largest_contentful_paint: audits['largest-contentful-paint'],
        first_meaningful_paint: audits['first-meaningful-paint'],
        total_blocking_time: audits['total-blocking-time'],
        cumulative_layout_shift: audits['cumulative-layout-shift'],
        speed_index: audits['speed-index'],
        time_to_interactive: audits.interactive,
        metrics: audits.metrics.details.items,
      }

      entries.push(parsed)

      if(isFinished){
        await fs.writeFile(`./data/${time_stamp}.json`, JSON.stringify(entries, null, 2), (err) => {
          if (err) {
            console.log('Failed to write data to file');
            return;
          }
        console.log('Created file successfully');
        }).then(() => console.log('✅ Finished'))
      }
    } catch(e) {
      throw Error(e)
    }
  })
})



