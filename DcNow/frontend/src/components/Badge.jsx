export default function Badge({ children, color = 'green' }) {
  const bg = color === 'green' ? '#d1fae5' : color === 'red' ? '#fee2e2' : '#e0f2fe';
  const colorText = color === 'green' ? '#065f46' : color === 'red' ? '#991b1b' : '#0369a1';
  return (
    <span style={{ background: bg, color: colorText, padding: '6px 10px', borderRadius: 999, fontWeight: 600, fontSize: 12 }}>
      {children}
    </span>
  );
}
