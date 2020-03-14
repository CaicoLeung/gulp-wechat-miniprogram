import del from 'del'

const cleanDistDir =  async () => await del('dist/**')

exports.cleanDistDir = cleanDistDir
