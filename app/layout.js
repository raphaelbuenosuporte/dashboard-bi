export const metadata = {
  title: 'Dashboard BI',
  description: 'Dashboard Comercial'
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f3f4f6' }}>
        {children}
      </body>
    </html>
  )
}
