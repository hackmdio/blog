export const EMBED_NOTE_REGEX =
  /^{%hackmd\s+(?:.*?:)*(?:(?:[./]*)(.*?)(?:[?#].*?)?\s+)%}$/
const id = 'embed-note'

export const embedNotePlugin = (md, options) => {
  function parse(state, startLine, endLine, silent) {
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]

    var match = EMBED_NOTE_REGEX.exec(state.src.slice(pos, max))
    if (!match) return false

    // don't insert any tokens in silent mode
    if (silent) return true

    state.line = startLine + 1

    const token = state.push(id, '', 0)
    token.map = [startLine, state.line]
    token.meta = { match: match }

    return true
  }

  function render(tokens, id, options, env = {}) {
    return ''
  }

  md.block.ruler.after('html_block', id, parse)

  md.renderer.rules[id] = render
}
