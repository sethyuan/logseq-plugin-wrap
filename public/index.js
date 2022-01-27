import "@logseq/libs"
import { render } from "preact"
import { debounce, throttle } from "rambdax"
import Toolbar from "./Toolbar.jsx"

const TOOLBAR_ID = "kef-wrap-toolbar"
const HEADBAR_HEIGHT = 48
let toolbar
let textarea

async function main() {
  // Reset values.
  toolbar = null
  textarea = null

  const settings = await generateUserConfig()

  logseq.provideStyle(`
    #kef-wrap-toolbar {
      position: absolute;
      top: 0;
      left: -99999px;
      opacity: 0;
      will-change: opacity;
      transition: opacity 100ms ease-in-out;
      background: #111;
      border-radius: 6px;
      color: #fff;
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 10px;
    }
    #main-container {
      overflow: hidden;
    }

    .dark-theme #kef-wrap-toolbar {

    }

    span[data-ref="#red"],
    span[data-ref="#green"],
    span[data-ref="#blue"],
    span[data-ref="$red"],
    span[data-ref="$green"],
    span[data-ref="$blue"] {
      display: none;
    }
    span[data-ref="#red"] + mark {
      background: #ffc7c7;
    }
    span[data-ref="#green"] + mark {
      background: #ccffc1;
    }
    span[data-ref="#blue"] + mark {
      background: #abdfff;
    }
    span[data-ref="$red"] + mark {
      color: #f00;
      background: unset;
      padding: 0;
      border-radius: 0;
    }
    span[data-ref="$green"] + mark {
      color: #0f0;
      background: unset;
      padding: 0;
      border-radius: 0;
    }
    span[data-ref="$blue"] + mark {
      color: #00f;
      background: unset;
      padding: 0;
      border-radius: 0;
    }
  `)

  const model = {}
  for (const { key, template } of settings.wrappings) {
    model[key] = () => wrap(template)
  }
  logseq.provideModel(model)

  if (settings.toolbar) {
    logseq.provideUI({
      key: TOOLBAR_ID,
      path: "#main-container",
      template: `<div id="${TOOLBAR_ID}"></div>`,
    })

    // Let div root element get generated first.
    setTimeout(async () => {
      toolbar = parent.document.getElementById(TOOLBAR_ID)
      render(<Toolbar items={settings.wrappings} model={model} />, toolbar)

      toolbar.addEventListener("transitionend", onToolbarTransitionEnd)
      parent.document.addEventListener("focusout", onBlur)

      const mainContentContainer = parent.document.getElementById(
        "main-content-container",
      )
      mainContentContainer.addEventListener("scroll", onScroll, {
        passive: true,
      })
    }, 0)
  }

  parent.document.addEventListener("selectionchange", onSelectionChange)

  logseq.beforeunload(async () => {
    const mainContentContainer = parent.document.getElementById(
      "main-content-container",
    )
    mainContentContainer.removeEventListener("scroll", onScroll, {
      passive: true,
    })
    toolbar?.removeEventListener("transitionend", onToolbarTransitionEnd)
    parent.document.removeEventListener("focusout", onBlur)
    parent.document.removeEventListener("selectionchange", onSelectionChange)
  })

  for (const { key, label, binding } of settings.wrappings) {
    if (binding) {
      logseq.App.registerCommandPalette(
        { key, label, keybinding: { binding } },
        model[key],
      )
    }
  }

  console.log("#wrap loaded")
}

async function generateUserConfig() {
  if (!logseq.settings?.wrappings) {
    // Generate the default settings if not any.
    const { preferredLanguage: lang } = await logseq.App.getUserConfigs()
    const defaultSettings = {
      disabled: false,
      toolbar: logseq.settings?.toolbar ?? true,
      wrappings: [
        {
          key: "wrap-cloze",
          label: lang === "zh-CN" ? "包围成 cloze" : "Wrap with cloze",
          binding: "mod+shift+e",
          template: "{{cloze $^}}",
        },
        {
          key: "wrap-red-hl",
          label:
            lang === "zh-CN" ? "包围成红色高亮" : "Wrap with red highlight",
          binding: "mod+shift+r",
          template: "[[#red]]==$^==",
        },
        {
          key: "wrap-green-hl",
          label:
            lang === "zh-CN" ? "包围成绿色高亮" : "Wrap with green highlight",
          binding: "mod+shift+g",
          template: "[[#green]]==$^==",
        },
        {
          key: "wrap-blue-hl",
          label:
            lang === "zh-CN" ? "包围成蓝色高亮" : "Wrap with blue highlight",
          binding: "mod+shift+b",
          template: "[[#blue]]==$^==",
        },
        {
          key: "wrap-red-text",
          label: lang === "zh-CN" ? "包围成红色文字" : "Wrap with red text",
          binding: "",
          template: "[[$red]]==$^==",
        },
        {
          key: "wrap-green-text",
          label: lang === "zh-CN" ? "包围成绿色文字" : "Wrap with green text",
          binding: "",
          template: "[[$green]]==$^==",
        },
        {
          key: "wrap-blue-text",
          label: lang === "zh-CN" ? "包围成蓝色文字" : "Wrap with blue text",
          binding: "",
          template: "[[$blue]]==$^==",
        },
      ],
    }
    logseq.updateSettings(defaultSettings)
    return defaultSettings
  }
  return logseq.settings
}

async function wrap(template) {
  const block = await logseq.Editor.getCurrentBlock()

  if (block == null || textarea == null || !textarea.isConnected) {
    const { preferredLanguage: lang } = await logseq.App.getUserConfigs()
    logseq.App.showMsg(
      lang === "zh-CN"
        ? "该命令仅在编辑文字时可使用"
        : "This command can only be used when editing text",
      "error",
    )
    return
  }

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const before = textarea.value.substring(0, start)
  const selection = textarea.value.substring(start, end)
  const after = textarea.value.substring(end)
  const [wrapBefore, wrapAfter] = template.split("$^")
  const text = `${before}${wrapBefore}${selection}${wrapAfter ?? ""}${after}`
  await logseq.Editor.updateBlock(block.uuid, text)
  textarea.focus()
  textarea.setSelectionRange(start + wrapBefore.length, end + wrapBefore.length)
}

async function onSelectionChange(e) {
  const activeElement = parent.document.activeElement
  if (
    activeElement !== textarea &&
    activeElement.nodeName.toLowerCase() === "textarea"
  ) {
    textarea = activeElement
  }

  if (toolbar != null && textarea?.isConnected) {
    if (
      textarea.selectionStart === textarea.selectionEnd &&
      toolbar.style.opacity !== "0"
    ) {
      toolbar.style.opacity = "0"
    } else if (textarea.selectionStart !== textarea.selectionEnd) {
      await positionToolbar()
    }
  }
}

async function positionToolbar() {
  const curPos = await logseq.Editor.getEditingCursorPosition()
  if (curPos != null) {
    toolbar.style.top = `${curPos.top + curPos.rect.y - 35 - HEADBAR_HEIGHT}px`
    toolbar.style.left = `${curPos.left + curPos.rect.x}px`
    toolbar.style.opacity = "1"
  }
}

function onToolbarTransitionEnd(e) {
  if (toolbar.style.opacity === "0") {
    toolbar.style.top = "0"
    toolbar.style.left = "-99999px"
  }
}

function onBlur(e) {
  // Update toolbar visibility upon activeElement change.
  if (document.activeElement !== textarea && toolbar?.style.opacity !== "0") {
    toolbar.style.opacity = "0"
  }
}

// There is a large gap between 2 displays of the toolbar, so a large
// ms number is acceptable.
const hideToolbar = throttle(() => {
  if (toolbar.style.opacity !== "0") {
    toolbar.style.opacity = "0"
  }
}, 1000)

const showToolbar = debounce(async () => {
  await positionToolbar()
}, 100)

function onScroll(e) {
  hideToolbar()
  showToolbar()
}

logseq.ready(main).catch(console.error)
