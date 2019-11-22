const exec = require('child_process').exec
const CLIEngine = require('eslint').CLIEngine
const cli = new CLIEngine({})
let pass = 0

function getErrorLevel (number) {
  return number === 2 ? 'error' : number === 1 ? 'warn' : 'undefined'
}

exec('git diff --cached --name-only| grep .js$', (error, stdout) => {
  if (stdout.length) {
    const array = stdout.split('\n')
    array.pop()
    const results = cli.executeOnFiles(array).results
    let errorCount = 0
    let warningCount = 0
    console.log('results: ', results)
    results.forEach((result) => {
      errorCount += result.errorCount
      warningCount += result.warningCount
      if (result.messages.length) {
        console.log('\n')
        console.log(result.filePath)
        result.messages.forEach((obj) => {
          const level = getErrorLevel(obj.severity)
          console.log(`${obj.line}: ${obj.column}  ${level}  ${obj.message}  ${obj.ruleId}`)
          pass = 1
        })
      }
    })
    if (warningCount > 0 || errorCount > 0) {
      console.log(`\n   ${errorCount + warningCount} problems (${errorCount} ${'errors'} ${warningCount} warnings)`)
    }
    process.exit(pass)
  }
  if (error) console.error(`exec error: ${error}`)
})
