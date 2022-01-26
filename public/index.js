import "@logseq/libs"

let textarea

async function main() {
  // Reset textarea value.
  textarea = null

  const settings = await generateUserConfig()

  logseq.provideStyle(`
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

  parent.document.addEventListener("selectionchange", onSelectionChange)

  const model = {}
  for (const { key, template } of settings.wrappings) {
    model[key] = () => wrap(template)
  }
  logseq.provideModel(model)

  for (const { key, label, binding } of settings.wrappings) {
    if (binding) {
      logseq.App.registerCommandPalette(
        { key, label, keybinding: { binding } },
        model[key],
      )
    }
  }

  logseq.beforeunload(async () => {
    parent.document.removeEventListener("selectionchange", onSelectionChange)
  })

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

function onSelectionChange(e) {
  const activeElement = parent.document.activeElement
  if (activeElement === textarea) return
  if (activeElement.nodeName.toLowerCase() === "textarea") {
    textarea = activeElement
  }
}

logseq.ready(main).catch(console.error)
