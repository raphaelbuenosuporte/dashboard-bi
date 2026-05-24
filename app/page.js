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

        // PEGA O NOME DA COLUNA DO EXCEL
        const nome = item['Nome 1'] || 'SEM NOME'

        // PEGA O VALOR VENDIDO
        const valor = Number(item['Valor vendido']) || 1

        if (!profissionais[nome]) {
          profissionais[nome] = 0
        }

        profissionais[nome] += valor
      })

      const rankingFinal = Object.keys(profissionais).map((nome) => ({
        nome,
        vendas: profissionais[nome]
      }))

      setRanking(rankingFinal)
    }

    carregarExcel()
  }, [])

  return (
    <main
      style={{
        padding: 20,
        fontFamily: 'Arial',
        background: '#0f172a',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 30 }}>
        Dashboard BI Comercial
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 20,
          marginBottom: 40
        }}
      >
        <div
          style={{
            background: '#1e293b',
            padding: 20,
            borderRadius: 10
          }}
        >
          <h2>Total Registros</h2>
          <p style={{ fontSize: 28 }}>{dados.length}</p>
        </div>

        <div
          style={{
            background: '#1e293b',
            padding: 20,
            borderRadius: 10
          }}
        >
          <h2>Profissionais</h2>
          <p style={{ fontSize: 28 }}>{ranking.length}</p>
        </div>

        <div
          style={{
            background: '#1e293b',
            padding: 20,
            borderRadius: 10
          }}
        >
          <h2>Top Vendas</h2>
          <p style={{ fontSize: 28 }}>
            {ranking[0]?.vendas || 0}
          </p>
        </div>

        <div
          style={{
            background: '#1e293b',
            padding: 20,
            borderRadius: 10
          }}
        >
          <h2>Eficiência</h2>
          <p style={{ fontSize: 28 }}>100%</p>
        </div>
      </div>

      <div
        style={{
          background: '#1e293b',
          padding: 20,
          borderRadius: 10,
          marginBottom: 30
        }}
      >
        <h2>Ranking de Profissionais</h2>

        {ranking.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 10,
              borderBottom: '1px solid #334155'
            }}
          >
            <span>{item.nome}</span>
            <span>{item.vendas}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          background: '#1e293b',
          padding: 20,
          borderRadius: 10,
          height: 400
        }}
      >
        <h2>Gráfico de Vendas</h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ranking}>
            <XAxis dataKey="nome" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="vendas" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}
