export default function Toolbar({ items, model }) {
  function triggerAction(e, key) {
    e.preventDefault()
    e.stopPropagation()
    if (e.button !== 0) return
    model[key]()
  }

  return (
    <div className="container">
      {items.map(({ key, label, icon }) => (
        <div
          key={key}
          class="kef-wrap-tb-item"
          onMouseDown={(e) => triggerAction(e, key)}
          title={label}
        >
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(icon)}`}
            alt={label}
          />
        </div>
      ))}
    </div>
  )
}
