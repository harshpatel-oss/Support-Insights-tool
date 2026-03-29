export default function Summary({text}){
  return (
    <div className="summary">
      <h3> Manager Summary</h3>
      <div style={{whiteSpace: 'pre-line'}}>
        {text}
      </div>
    </div>
  );
}