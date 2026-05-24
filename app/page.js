'use client'

import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function Home() {
  const [dados, setDados] = useState([])
  const [ranking, setRanking] = useState([])

  useEffect(() => {
    async function carregarExcel() {
      const response = await fetch('/TES%202.xlsx')
      const arrayBuffer = await response.arrayBuffer()

      const workbook = XLSX.read(arrayBuffer)
      const sheet = workbook.Sheets[workbook.SheetNames[0]]

      const json = XLSX.utils.sheet_to_json(sheet)

      setDados(json)

      const profissionais = {}

      json.forEach((item) => {
        const nome = item.PROFISSIONAL || 'SEM NOME'

        if (!profissionais[nome]) {
          profissionais[nome] = 0
        }

        profissionais[nome] += 1
      })

      const rankingArray = Object.entries(profissionais).map(
        ([nome, vendas]) => ({
          nome,
          vendas
        })
      )

      rankingArray.sort((a, b) => b.vendas - a.vendas)

      setRanking(rankingArray)
    }

    carregarExcel()
  }, [])

  return (
    <main style={{ padding: 30, background: '#f3f4f6', minHeight: '100vh' }}>
      <div
        style={{
          background: 'white',
          padding: 24,
          borderRadius: 20,
          marginBottom: 20
        }}
      >
        <h1 style={{ fontSize: 42 }}>
          Dashboard BI Comercial
        </h1>

        <p style={{ color: '#666' }}>
          Sistema inteligente conectado ao Excel
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
          gap: 20,
          marginBottom: 20
        }}
      >
        <Card titulo="Total Registros" valor={dados.length} />
        <Card titulo="Profissionais" valor={ranking.length} />
        <Card titulo="Top Vendas" valor={ranking[0]?.vendas || 0} />
        <Card
          titulo="Eficiência"
          valor={`${Math.round(
            ((ranking[0]?.vendas || 0) / (dados.length || 1)) * 100
          )}%`}
        />
      </div>

      <div
        style={{
          background: 'white',
          padding: 24,
          borderRadius: 20,
          marginBottom: 20
        }}
      >
        <h2 style={{ marginBottom: 20 }}>
          Ranking de Profissionais
        </h2>

        {ranking.slice(0, 10).map((p, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 14,
              background: '#f9fafb',
              borderRadius: 12,
              marginBottom: 10
            }}
          >
            <strong>{p.nome}</strong>

            <strong>{p.vendas}</strong>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'white',
          padding: 24,
          borderRadius: 20
        }}
      >
        <h2 style={{ marginBottom: 20 }}>
          Gráfico de Vendas
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={ranking.slice(0, 10)}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vendas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}

function Card({ titulo, valor }) {
  return (
    <div
      style={{
        background: 'white',
        padding: 20,
        borderRadius: 20
      }}
    >
      <p style={{ color: '#666' }}>
        {titulo}
      </p>

      <h2 style={{ fontSize: 34 }}>
        {valor}
      </h2>
    </div>
  )
}
