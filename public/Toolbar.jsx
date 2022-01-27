export default function Toolbar({ items, model }) {
  function triggerAction(e, key) {
    e.preventDefault()
    e.stopPropagation()
    if (e.button !== 0) return
    model[key]()
  }

  return items.map(({ key, label, icon }) => (
    <div
      key={key}
      className="kef-wrap-tb-item"
      onMouseDown={(e) => triggerAction(e, key)}
      dangerouslySetInnerHTML={{ __html: icon || "X" }}
      title={label}
    ></div>
  ))
}
