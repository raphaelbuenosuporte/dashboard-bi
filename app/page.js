'use client'

import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

export default function Home() {

  const [ranking, setRanking] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {

    async function carregarExcel() {

      const response = await fetch('/TES%202.xlsx')
      const arrayBuffer = await response.arrayBuffer()

      const workbook = XLSX.read(arrayBuffer)

      const sheet = workbook.Sheets[workbook.SheetNames[0]]

      const json = XLSX.utils.sheet_to_json(sheet)

      const profissionais = {}

      json.forEach((item) => {

        let nome = item['Nome 1']
        const valor = Number(item['Valor vendido']) || 0

        if (!nome) return
        if (valor <= 0) return

        nome = nome
          .toString()
          .trim()
          .toUpperCase()

        if (!profissionais[nome]) {
          profissionais[nome] = 0
        }

        profissionais[nome] += valor
      })

      const rankingFinal = Object.keys(profissionais)
        .map((nome) => ({
          nome,
          vendas: profissionais[nome]
        }))
        .sort((a, b) => b.vendas - a.vendas)

      setRanking(rankingFinal)

      const soma = rankingFinal.reduce(
        (acc, item) => acc + item.vendas,
        0
      )

      setTotal(soma)

    }

    carregarExcel()

  }, [])

  const top10 = ranking.slice(0, 10)

  return (

    <main
      style={{
        background: '#0f172a',
        minHeight: '100vh',
        padding: 30,
        color: 'white',
        fontFamily: 'Arial'
      }}
    >

      <h1
        style={{
          fontSize: 40,
          marginBottom: 30
        }}
      >
        BI Comercial
      </h1>

      {/* CARDS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
          gap: 20,
          marginBottom: 40
        }}
      >

        <div style={card}>
          <p>Total Vendido</p>
          <h2>
            R$ {total.toLocaleString()}
          </h2>
        </div>

        <div style={card}>
          <p>Profissionais</p>
          <h2>
            {ranking.length}
          </h2>
        </div>

        <div style={card}>
          <p>Top Performer</p>
          <h3>
            {ranking[0]?.nome || '-'}
          </h3>
        </div>

      </div>

      {/* TOP 10 */}

      <div
        style={{
          background: '#1e293b',
          padding: 30,
          borderRadius: 25
        }}
      >

        <h2
          style={{
            marginBottom: 30
          }}
        >
          Top 10 Profissionais
        </h2>

        {

          top10.map((item, index) => {

            const porcentagem =
              (item.vendas / top10[0].vendas) * 100

            return (

              <div
                key={index}
                style={{
                  marginBottom: 25
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8
                  }}
                >

                  <span
                    style={{
                      fontWeight: 'bold'
                    }}
                  >
                    {index === 0 && '🥇 '}
                    {index === 1 && '🥈 '}
                    {index === 2 && '🥉 '}

                    {item.nome}
                  </span>

                  <span>
                    R$ {item.vendas.toLocaleString()}
                  </span>

                </div>

                <div
                  style={{
                    background: '#334155',
                    height: 18,
                    borderRadius: 20,
                    overflow: 'hidden'
                  }}
                >

                  <div
                    style={{
                      width: `${porcentagem}%`,
                      background: '#3b82f6',
                      height: '100%'
                    }}
                  />

                </div>

              </div>

            )

          })

        }

      </div>

    </main>
  )
}

const card = {
  background: '#1e293b',
  padding: 25,
  borderRadius: 25
}
