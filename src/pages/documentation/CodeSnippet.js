import { useState } from "react"
import { Box, IconButton } from "@mui/material"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import DoneAllIcon from "@mui/icons-material/DoneAll"

const CodeSnippet = ({ children, canCopy = false, language = "text" }) => {
  const [copy, setCopy] = useState(false)

  const copyHandler = async () => {
    await navigator.clipboard.writeText(children)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  }

  return (
    <Box className="bg-[#282c34] rounded-[10px] flex w-full justify-between items-start">
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        wrapLines
        customStyle={{ padding: "20px 20px", borderRadius: "10px" }}
      >
        {children}
      </SyntaxHighlighter>
      <Box className="pr-5 pt-3">
        {canCopy &&
          (!copy ? (
            <IconButton color="secondary" onClick={copyHandler}>
              <ContentCopyIcon color="secondary" />
            </IconButton>
          ) : (
            <IconButton sx={{ pointerEvents: "none" }}>
              <DoneAllIcon color="secondary" />
            </IconButton>
          ))}
      </Box>
    </Box>
  )
}

export default CodeSnippet
