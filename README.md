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
  "wrap-cloze": {
    "label": "Wrap with cloze",
    "binding": "mod+shift+e",
    "template": "{{cloze $^}}",
    "icon": "<svg t=\"1643261888324\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5478\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"200\" height=\"200\"><defs><style type=\"text/css\"></style></defs><path d=\"M341.333333 396.8V320H170.666667v384h170.666666v-76.8H256V396.8zM682.666667 396.8V320h170.666666v384h-170.666666v-76.8h85.333333V396.8zM535.04 533.333333h40.96v-42.666666h-40.96V203.093333l92.16-24.746666-11.093333-40.96-102.4 27.306666-102.4-27.306666-11.093334 40.96 92.16 24.746666v287.573334H448v42.666666h44.373333v287.573334l-92.16 24.746666 11.093334 40.96 102.4-27.306666 102.4 27.306666 11.093333-40.96-92.16-24.746666z\" p-id=\"5479\" fill=\"#eeeeee\"></path></svg>"
  },
  "wrap-red-hl": {
    "label": "Wrap with red highlight",
    "binding": "mod+shift+r",
    "template": "[[#red]]==$^==",
    "icon": "<svg t=\"1643262039637\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"6950\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"200\" height=\"200\"><defs><style type=\"text/css\"></style></defs><path d=\"M114.727313 1024l0.305421-0.427589h-0.977347l0.671926 0.427589zM632.721199 809.365446c-156.680934 0-272.466006 41.644143-341.659116 75.927642L290.878831 972.108985C340.402833 942.605324 458.249497 885.720677 632.73647 885.720677H962.804862v-76.355231H632.73647z m-109.432317-72.018253l252.048617-528.378197a38.177615 38.177615 0 0 0-13.621773-48.790993L551.295981 24.464216a38.192886 38.192886 0 0 0-50.089031 7.696607L130.349594 483.908911a38.208157 38.208157 0 0 0-7.024682 35.886958c31.763776 100.315502 36.436716 182.626441 34.695817 234.777064L94.477906 870.449631h132.094549l32.221908-42.606219c49.78361-25.624815 134.15614-60.931474 233.326314-69.177839a38.147073 38.147073 0 0 0 31.152934-21.31838z m-59.343285-52.54767c-71.66702 8.505973-134.950235 28.572127-184.489509 49.157497l-45.339736-29.244053c-2.290657-50.883126-10.613377-114.716099-31.901215-187.849139l336.161539-409.874879 153.474014 98.986922-193.728492 408.653195-176.838714-112.746134-47.935814 60.015211 191.117142 121.847678-0.519215 1.053702z\" p-id=\"6951\" fill=\"#ffc7c7\"></path></svg>"
  },
  "wrap-green-hl": {
    "label": "Wrap with green highlight",
    "binding": "mod+shift+g",
    "template": "[[#green]]==$^==",
    "icon": "<svg t=\"1643262039637\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"6950\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"200\" height=\"200\"><defs><style type=\"text/css\"></style></defs><path d=\"M114.727313 1024l0.305421-0.427589h-0.977347l0.671926 0.427589zM632.721199 809.365446c-156.680934 0-272.466006 41.644143-341.659116 75.927642L290.878831 972.108985C340.402833 942.605324 458.249497 885.720677 632.73647 885.720677H962.804862v-76.355231H632.73647z m-109.432317-72.018253l252.048617-528.378197a38.177615 38.177615 0 0 0-13.621773-48.790993L551.295981 24.464216a38.192886 38.192886 0 0 0-50.089031 7.696607L130.349594 483.908911a38.208157 38.208157 0 0 0-7.024682 35.886958c31.763776 100.315502 36.436716 182.626441 34.695817 234.777064L94.477906 870.449631h132.094549l32.221908-42.606219c49.78361-25.624815 134.15614-60.931474 233.326314-69.177839a38.147073 38.147073 0 0 0 31.152934-21.31838z m-59.343285-52.54767c-71.66702 8.505973-134.950235 28.572127-184.489509 49.157497l-45.339736-29.244053c-2.290657-50.883126-10.613377-114.716099-31.901215-187.849139l336.161539-409.874879 153.474014 98.986922-193.728492 408.653195-176.838714-112.746134-47.935814 60.015211 191.117142 121.847678-0.519215 1.053702z\" p-id=\"6951\" fill=\"#ccffc1\"></path></svg>"
  },
  "wrap-blue-hl": {
    "label": "Wrap with blue highlight",
    "binding": "mod+shift+b",
    "template": "[[#blue]]==$^==",
    "icon": "<svg t=\"1643262039637\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"6950\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"200\" height=\"200\"><defs><style type=\"text/css\"></style></defs><path d=\"M114.727313 1024l0.305421-0.427589h-0.977347l0.671926 0.427589zM632.721199 809.365446c-156.680934 0-272.466006 41.644143-341.659116 75.927642L290.878831 972.108985C340.402833 942.605324 458.249497 885.720677 632.73647 885.720677H962.804862v-76.355231H632.73647z m-109.432317-72.018253l252.048617-528.378197a38.177615 38.177615 0 0 0-13.621773-48.790993L551.295981 24.464216a38.192886 38.192886 0 0 0-50.089031 7.696607L130.349594 483.908911a38.208157 38.208157 0 0 0-7.024682 35.886958c31.763776 100.315502 36.436716 182.626441 34.695817 234.777064L94.477906 870.449631h132.094549l32.221908-42.606219c49.78361-25.624815 134.15614-60.931474 233.326314-69.177839a38.147073 38.147073 0 0 0 31.152934-21.31838z m-59.343285-52.54767c-71.66702 8.505973-134.950235 28.572127-184.489509 49.157497l-45.339736-29.244053c-2.290657-50.883126-10.613377-114.716099-31.901215-187.849139l336.161539-409.874879 153.474014 98.986922-193.728492 408.653195-176.838714-112.746134-47.935814 60.015211 191.117142 121.847678-0.519215 1.053702z\" p-id=\"6951\" fill=\"#abdfff\"></path></svg>"
  },
  "wrap-red-text": {
    "label": "Wrap with red text",
    "binding": "",
    "template": "[[$red]]^^$^^^",
    "icon": "<svg t=\"1643270432116\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"12761\" width=\"200\" height=\"200\"><path d=\"M256 768h512a85.333333 85.333333 0 0 1 85.333333 85.333333v42.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333v-42.666667a85.333333 85.333333 0 0 1 85.333333-85.333333z m0 85.333333v42.666667h512v-42.666667H256z m401.578667-341.333333H366.421333L298.666667 682.666667H213.333333l256.128-640H554.666667l256 640h-85.333334l-67.754666-170.666667z m-33.877334-85.333333L512 145.365333 400.298667 426.666667h223.402666z\" p-id=\"12762\" fill=\"#f00\"></path></svg>"
  },
  "wrap-green-text": {
    "label": "Wrap with green text",
    "binding": "",
    "template": "[[$green]]^^$^^^",
    "icon": "<svg t=\"1643270432116\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"12761\" width=\"200\" height=\"200\"><path d=\"M256 768h512a85.333333 85.333333 0 0 1 85.333333 85.333333v42.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333v-42.666667a85.333333 85.333333 0 0 1 85.333333-85.333333z m0 85.333333v42.666667h512v-42.666667H256z m401.578667-341.333333H366.421333L298.666667 682.666667H213.333333l256.128-640H554.666667l256 640h-85.333334l-67.754666-170.666667z m-33.877334-85.333333L512 145.365333 400.298667 426.666667h223.402666z\" p-id=\"12762\" fill=\"#0f0\"></path></svg>"
  },
  "wrap-blue-text": {
    "label": "Wrap with blue text",
    "binding": "",
    "template": "[[$blue]]^^$^^^",
    "icon": "<svg t=\"1643270432116\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"12761\" width=\"200\" height=\"200\"><path d=\"M256 768h512a85.333333 85.333333 0 0 1 85.333333 85.333333v42.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333v-42.666667a85.333333 85.333333 0 0 1 85.333333-85.333333z m0 85.333333v42.666667h512v-42.666667H256z m401.578667-341.333333H366.421333L298.666667 682.666667H213.333333l256.128-640H554.666667l256 640h-85.333334l-67.754666-170.666667z m-33.877334-85.333333L512 145.365333 400.298667 426.666667h223.402666z\" p-id=\"12762\" fill=\"#00beff\"></path></svg>"
  }
}
```

在 Logseq 的插件页面打开插件的配置后，有以下几项配置可供使用，请参照上方代码块进行设置（各项的默认值以体现在代码块中）：

- `toolbar`: 不想用工具栏可以设置为`false`。
- `wrap-*`: 自定义的文字包围都定义在这里。你可以扩展默认提供的这些规则，也可以移除或替换你不需要的规则。配置方法请参考上面的示例，`binding`不能出现重复。`template`是你包围文字的模板，里面的`$^`代表原本被选中的文字。

There are a couple of user settings available when you access the plugin settings from Logseq's plugins page. Please refer to the source block above (Default values are given in the source block).

- `toolbar`: You can set it to `false` if you don't want to use the toolbar.
- `wrap-*`: Your custom wrappings are defined here. You can extend default wrappings and/or replace/remove them. Please refer to the above configuration for how to define wrappings, `binding` should be unique, `template` defines how you want the selected text to be wrapped, `$^` represents the selected text.

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

内置高亮与文字色的样式如下：

Builtin styles for highlight and text color is as follows:

```css
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
```
