const colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
}

class DDTLogger {
  currDate: String
  lastLogDate: String
  lastTag: String
  info(message, tag = '', env = { development: true, DEV: true }) {
    const outStream = console.log
    if (!env[process.env.NODE_ENV]) return
    this.currDate = `[at ${Date()}] : `

    if (this.currDate != this.lastLogDate) {
      outStream(colors.Dim, colors.FgGreen)
      outStream(this.currDate, colors.Reset)
    }

    if (!!tag && tag != this.lastTag) {
      outStream(colors.Bright, colors.FgBlue)
      outStream(`[tag] : ${tag}`)
      this.lastTag = tag
    }
    outStream(colors.Reset)
    outStream(message && '#',message)
    this.lastLogDate = this.currDate
    outStream(colors.Reset)
  }
  error(message, tag = '', env = { development: true, DEV: true }) {
    this.info('', tag, env)
    console.error(message)
  }
}
export const logger = new DDTLogger()
