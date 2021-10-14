import RegexPlugin from 'markdown-it-regexp'

// regex for extra tags
const spaceregex = /\s*/
const notinhtmltagregex = /(?![^<]*>|[^<>]*<\/)/
let coloregex = /\[color=([#|(|)|\s|,|\w]*?)\]/
coloregex = new RegExp(coloregex.source + notinhtmltagregex.source, 'g')
let nameregex = /\[name=(.*?)\]/
let timeregex = /\[time=([:|,|+|-|(|)|\s|\w]*?)\]/
const nameandtimeregex = new RegExp(
  nameregex.source +
    spaceregex.source +
    timeregex.source +
    notinhtmltagregex.source,
  'g'
)
nameregex = new RegExp(nameregex.source + notinhtmltagregex.source, 'g')
timeregex = new RegExp(timeregex.source + notinhtmltagregex.source, 'g')

export const colorTags = new RegexPlugin(coloregex, (match, utils, token) => {
  return `<span class="color" data-color="${match[1]}"></span>`
})

export const nameAndTimeTag = new RegexPlugin(
  nameandtimeregex,
  (match, utils, token) => {
    return `<small><i class="fa fa-user"></i> ${match[1]} <i class="fa fa-clock-o"></i> ${match[2]}</small>`
  }
)

export const nameTag = new RegexPlugin(nameregex, (match, utils, token) => {
  return `<small><i class="fa fa-user"></i> ${match[1]}</small>`
})

export const timeTag = new RegexPlugin(timeregex, (match, utils, token) => {
  return `<small><i class="fa fa-clock-o"></i> ${match[1]}</small>`
})

export const setupExtraTags = (md) => {
  md.use(colorTags)
  md.use(nameAndTimeTag)
  md.use(nameTag)
  md.use(timeTag)
}
