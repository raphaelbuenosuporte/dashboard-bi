export default function Home() {
  const profissionais = [
    { nome: 'RAPHAEL BUENO DA SILVA', equipe: 'PARK', vendas: 25 },
    { nome: 'JOSYENE FREITAS', equipe: 'PARK', vendas: 21 },
    { nome: 'FRANCISCO RODRIGUES', equipe: 'EXTERNA', vendas: 23 },
    { nome: 'IGOR SENNA', equipe: 'EXTERNA', vendas: 17 }
  ]

  return (
    <main style={{ padding: 30 }}>
      <div style={{
        background: 'white',
        padding: 24,
        borderRadius: 20,
        marginBottom: 20,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ fontSize: 40, marginBottom: 10 }}>
          Dashboard Comercial
        </h1>

        <p style={{ color: '#666' }}>
          Sistema BI de captação, vendas e cancelamentos
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20,
        marginBottom: 20
      }}>
        {[
          ['Total de Casais', '274'],
          ['Cotas Ativas', '198'],
          ['Cancelamentos', '76'],
          ['Eficiência', '72%']
        ].map((item, i) => (
          <div key={i} style={{
            background: 'white',
            padding: 20,
            borderRadius: 20,
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
          }}>
            <p style={{ color: '#666' }}>{item[0]}</p>
            <h2 style={{ fontSize: 34 }}>{item[1]}</h2>
          </div>
        ))}
      </div>

      <div style={{
        background: 'white',
        padding: 24,
        borderRadius: 20,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ marginBottom: 20 }}>Ranking de Profissionais</h2>

        {profissionais.map((p, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 14,
            background: '#f9fafb',
            borderRadius: 12,
            marginBottom: 10
          }}>
            <div>
              <strong>{p.nome}</strong>
              <div style={{ color: '#666', fontSize: 14 }}>
                {p.equipe}
              </div>
            </div>

            <strong>{p.vendas} vendas</strong>
          </div>
        ))}
      </div>
    </main>
  )
}
