const glob = require("glob")
const fs = require("node:fs/promises")
const config = require("../datahog.config")
const { deleteDir } = require("./utils")

let entries = []

console.log('☕️ Starting Datahog Parser')


glob(".lighthouseci/lhr-*.json", { nonull: true }, async function (er, files) {
  await files.forEach(async (filePath, index) => {
    const isFinished = index === (files.length - 1)
    try {
      const data = await fs.readFile(filePath, { encoding: 'utf-8' })
      const parse = JSON.parse(data)
      const { audits, finalUrl, fetchTime } = parse
      const time_stamp = new Date(fetchTime).toISOString()
      
      const parsed = {
				url: finalUrl,
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
            console.log('Datahog Error: Failed to write data to file');
            return;
          }
        console.log('Created file successfully');
        }).then(() => deleteDir(".lighthouseci/") && console.log('✅ Datahog Parser Successfully Finished'))
      }
    } catch(e) {
      throw Error(e)
    }
  })
})



