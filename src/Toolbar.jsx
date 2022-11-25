import { ToolbarItem } from "./ToolbarItem"

export default function Toolbar({ items, model }) {
  function triggerAction(e, key) {
    e.preventDefault()
    e.stopPropagation()
    if (e.button !== 0) return
    model[key]()
  }

  return items.map((item) => {
    if (item.key.startsWith("group-")) {
      const groupItems = item.items?.filter((subitem) => subitem.icon) ?? []
      if (groupItems.length <= 0) return null
      return (
        <div class="kef-wrap-tb-list">
          <ToolbarItem {...groupItems[0]} action={triggerAction} />
          {groupItems.length > 1 && (
            <div class="kef-wrap-tb-itemlist">
              {groupItems.map((subitem, i) => {
                if (i === 0) return null
                return <ToolbarItem {...subitem} action={triggerAction} />
              })}
            </div>
          )}
        </div>
      )
    } else if (item.icon) {
      return <ToolbarItem {...item} action={triggerAction} />
    }
    return null
  })
}
