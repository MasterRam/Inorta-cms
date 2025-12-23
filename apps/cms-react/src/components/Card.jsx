export const Card = ({ children, className = '', title }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-dark-900">{title}</h3>}
      {children}
    </div>
  )
}
