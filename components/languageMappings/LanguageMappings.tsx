const LanguageMappings = ({
  mappings,
}: {
  mappings: { [key: string]: string }
}) => {
  return (
    <div>
      <h2>Saved language mappings</h2>
      {Object.keys(mappings).map((key: string) => (
        <p key={key}>{`${key} -> ${mappings[key as keyof typeof mappings]}`}</p>
      ))}
    </div>
  )
}

export default LanguageMappings
