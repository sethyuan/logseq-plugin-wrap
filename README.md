# logseq-plugin-wrap

创建自定义文字包围及快捷键，默认提供了一组实用的配置。

Create your own wrappings with optional key bindings for selected text, a set of useful defaults is also provided.

## 使用展示 (Usage)

![demo](./demo.gif)

## 用户配置 (User configs)

```json
{
  "disabled": false,
  "toolbar": true,
  "wrappings": [
    {
      "key": "wrap-cloze",
      "label": "Wrap with cloze",
      "binding": "mod+shift+e",
      "template": "{{cloze $^}}"
    },
    {
      "key": "wrap-red-hl",
      "label": "Wrap with red highlight",
      "binding": "mod+shift+r",
      "template": "[[#red]]==$^=="
    },
    {
      "key": "wrap-green-hl",
      "label": "Wrap with green highlight",
      "binding": "mod+shift+g",
      "template": "[[#green]]==$^=="
    },
    {
      "key": "wrap-blue-hl",
      "label": "Wrap with blue highlight",
      "binding": "mod+shift+b",
      "template": "[[#blue]]==$^=="
    },
    {
      "key": "wrap-red-text",
      "label": "Wrap with red text",
      "binding": "",
      "template": "[[$red]]==$^=="
    },
    {
      "key": "wrap-green-text",
      "label": "Wrap with green text",
      "binding": "",
      "template": "[[$green]]==$^=="
    },
    {
      "key": "wrap-blue-text",
      "label": "Wrap with blue text",
      "binding": "",
      "template": "[[$blue]]==$^=="
    }
  ]
}
```

在 Logseq 的插件页面打开插件的配置后，有以下几项配置可供使用，请参照上方代码块进行设置（各项的默认值以体现在代码块中）：

- `toolbar`: 不想用工具栏可以设置为`false`。
- `wrappings`: 自定义的文字包围都定义在这里。你可以扩展默认提供的行为，也可以移除或替换你不需要的默认行为。配置方法请参考上面的配置，`key`与`binding`不能出现重复。`template`是你包围文字的模板，里面的`$^`代表原本被选中的文字。

There are a couple of user settings available when you access the plugin settings from Logseq's plugins page. Please refer to the source block above (Default values are given in the source block).

- `toolbar`: You can set it to `false` if you don't want to use the toolbar.
- `wrappings`: Your custom wrappings are defined here. You can extend default wrappings and/or replace/remove them. Please refer to the above configuration for how to define wrappings, `key` and `binding` should be unique, `template` defines how you want the selected text to be wrapped, `$^` represents the selected text.

## 自定义工具栏样式 (Toolbar style customization)

请参看下方示例：

Please refer to the following example:

```css
/* 这里更改工具栏本身的样式 */
/* Here goes styles for the toolbar itself */
#kef-wrap-toolbar {
  background: #333;
}

/* 这里是工具栏上按钮的样式 */
/* Here goes styles for toolbar buttons */
.kef-wrap-tb-item {
  width: 30px;
  line-height: 30px;
  height: 30px;
}

/* 这里是工具栏上按钮在有鼠标悬浮时的样式 */
/* Here goes styles for toolbar buttons when hovered */
.kef-wrap-tb-item:hover {
  filter: drop-shadow(0 0 3px #fff);
}

/* 这里可以定义svg图标的样式 */
/* Here you can define styles for the svg icon */
.kef-wrap-tb-item svg {
  fill: #eee;
}
```
