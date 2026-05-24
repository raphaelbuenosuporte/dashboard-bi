'use client'

import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

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

        // PEGA O NOME
        let nome = item['Nome 1']

        // PEGA O CARGO
        const cargo = item['Cargo'] || ''

        // PEGA VALOR
        const valor = Number(item['Valor vendido']) || 0

        // IGNORA VAZIOS
        if (!nome) return

        // SOMENTE PROMOTOR DE MARKETING
        if (
          !cargo.toString().toUpperCase().includes('PROMOTOR')
        ) return

        // PADRONIZA NOMES
        nome = nome
          .toString()
          .trim()
          .toUpperCase()

        // REMOVE DUPLICADOS
        if (!profissionais[nome]) {
          profissionais[nome] = 0
        }

        profissionais[nome] += valor
      })

      // CONVERTE OBJETO EM ARRAY
      const rankingFinal = Object.keys(profissionais).map((nome) => ({
        nome,
        vendas: profissionais[nome]
      }))

      // ORDENA MAIOR PARA MENOR
      rankingFinal.sort((a, b) => b.vendas - a.vendas)

      setRanking(rankingFinal)

      // TOTAL GERAL
      const soma = rankingFinal.reduce(
        (acc, item) => acc + item.vendas,
        0
      )

      setTotal(soma)
    }

    carregarExcel()

  }, [])

  return (

    <main
      style={{
        background: '#0f172a',
        minHeight: '100vh',
        color: 'white',
        padding: 30,
        fontFamily: 'Arial'
      }}
    >

      <h1
        style={{
          fontSize: 38,
          marginBottom: 30,
          fontWeight: 'bold'
        }}
      >
        Dashboard BI Comercial
      </h1>

      {/* CARDS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 20,
          marginBottom: 40
        }}
      >

        <div style={card}>
          <h3>Total Profissionais</h3>
          <p style={numero}>
            {ranking.length}
          </p>
        </div>

        <div style={card}>
          <h3>Total Vendido</h3>
          <p style={numero}>
            R$ {total.toLocaleString()}
          </p>
        </div>

        <div style={card}>
          <h3>Top Performer</h3>
          <p style={numeroMenor}>
            {ranking[0]?.nome || '-'}
          </p>
        </div>

        <div style={card}>
          <h3>Maior Venda</h3>
          <p style={numero}>
            R$ {ranking[0]?.vendas?.toLocaleString() || 0}
          </p>
        </div>

      </div>

      {/* RANKING */}

      <div
        style={{
          background: '#1e293b',
          borderRadius: 20,
          padding: 25,
          marginBottom: 40
        }}
      >

        <h2
          style={{
            marginBottom: 20
          }}
        >
          Top 10 Profissionais
        </h2>

        {
          ranking.slice(0, 10).map((item, index) => (

            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 15,
                borderBottom: '1px solid #334155'
              }}
            >

              <span>
                #{index + 1} - {item.nome}
              </span>

              <strong>
                R$ {item.vendas.toLocaleString()}
              </strong>

            </div>

          ))
        }

      </div>

      {/* GRAFICO */}

      <div
        style={{
          background: '#1e293b',
          borderRadius: 20,
          padding: 25,
          height: 500
        }}
      >

        <h2>
          Ranking de Vendas
        </h2>

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={ranking.slice(0, 10)}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="nome"
              stroke="#fff"
            />

            <YAxis stroke="#fff" />

            <Tooltip />

            <Bar
              dataKey="vendas"
              fill="#3b82f6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </main>
  )
}

const card = {
  background: '#1e293b',
  padding: 25,
  borderRadius: 20
}

const numero = {
  fontSize: 30,
  fontWeight: 'bold',
  marginTop: 10
}

const numeroMenor = {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 10
}
